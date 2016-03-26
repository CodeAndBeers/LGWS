var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fjs = require("functional.js");
const encryption = require("./encryption.js");
const states = require("./states.js");

var games = {};
var id = 0;

class Player {
  constructor(pseudo)  {
    this.pseudo = pseudo;
    this.role = "NONE";
    this.dead = "NONE";
    this.vote = null;
    //this.revealed: false; //voyante
    //this.life_potion: false, //sorcière
    //this.death_potion: true, //sorcière
    //this.lover: true,
    //this.captain: true,
  }
}

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

function updateAllPlayers(game) {
    const game_view = JSON.parse(JSON.stringify(game, function(key, value) {
      if (key === "socket") {
        return undefined;
      } else {
        return value;
      }
    }));
    game.mj.socket.emit("game_update", game_view);
    game.players.forEach(function (player) {
      player.socket.emit("game_update", game_view);
    });
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('error', function(err) {
    console.log(" Error");
    console.log(err);
  });
  socket.on('create_game', function (data, fn) {
    console.log("Creating game");
    let game = {};
    socket.isMJ = true;
    socket.game = game;
    game.mj = {};
    game.mj.socket = socket;
    game.mj.pseudo = data.pseudo;
    game.id = id++;
    game.turn = 0;
    game.state = states.WAITING_PLAYERS;
    game.players = [];
    games[game.id] = game;

    fn({ result: 'ok', id: game.id });

    console.log("Creating game");
    //game.updatePlayers = function () {updatePlayers(this)};
    socket.on('next', function () {
      socket.game.state = socket.game.state.next();
      updateAllPlayers(game);
    });
    updateAllPlayers(game);

  });

  socket.on('join_game', function(data, fn) {
    const id = encryption.decrypt(data.code);
    let game = games[id];
    console.log("Join game id:" + game.id);
    if (game.state.name === states.WAITING_PLAYERS.name) {
      console.log("Add player");
      let player = new Player(data.pseudo);
      socket.game = game;
      socket.player = player;
      player.socket = socket;
      game.players.push(player);
      for (var state_name in states) {
        var state = states[state_name];
        console.log("Register state: " + state.name);
        state.actions.forEach(function (action) {
          console.log("Register action: " + action.name);
          socket.on(action.name, function(param){
            action.fct(socket.game, socket.player, param);
          });
        })
      }
    } else {
      //TODO Handle reconnection
    }

    fn({ result: 'ok', id: game.id });

    updateAllPlayers(game);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
