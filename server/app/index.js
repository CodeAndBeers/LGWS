var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const encryption = require("./encryption.js");
const states = require("./states.js");
const roles = require("./roles.js");

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
  }
}

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

function format_game(game) {
  return JSON.parse(JSON.stringify(game, function(key, value) {
    if (key === "socket") {
      return undefined;
    } else if (key === "id") {
      return encryption.encrypt(value);
    } else if (key === "vote") {
      if (value) return value.pseudo;
      else return value;
    } else {
      return value;
    }
  }));
}

function updateAllPlayers(game) {
    console.log('updateAllPlayers');
    game.me = game.mj;
    game.mj.socket.emit("game_update", format_game(game));
    game.players.forEach(function (player) {
      game.me = player;
      player.socket.emit("game_update", format_game(game));
    });
    delete game.me;
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
    game.mj.role = "MJ";
    game.id = id++;
    game.turn = 0;
    game.state = states.WAITING_PLAYERS;
    game.players = [];
    game.players.findByPseudo = function (pseudo) {
      return game.players.find(player => player.pseudo === pseudo);
    };
    game.players.getHunter  = function (pseudo) {
      return game.players.find(player => player.role.name === roles.HUNTER.name);
    };
    game.updateAllPlayers = function() {updateAllPlayers(game)};
    games[game.id] = game;

    if (fn) {
      fn({ result: 'ok', id: encryption.encrypt(game.id) });
    }

    //game.updatePlayers = function () {updatePlayers(this)};
    socket.on('next', function (param) {
      console.log("Moving to state '" + JSON.stringify(socket.game.state) + "' with param ["+ JSON.stringify(param) +"]");
      socket.game.state = socket.game.state.next(game, param);
      updateAllPlayers(game);
    });
    updateAllPlayers(game);

  });

  socket.on('join_game', function(data, fn) {
    const id = encryption.decrypt(data.code);
    console.log(id);
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
      if (data.force_role) {
        console.log("Force " + player.pseudo + " as " + data.force_role);
        player.role = roles[data.force_role];
        if (player.role.init) {
          player.role.init(player);
        }
      }
    } else {
      //TODO Handle reconnection
    }
    if (fn) {
      fn({ result: 'ok', id: encryption.encrypt(game.id) });
    }
    updateAllPlayers(game);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
