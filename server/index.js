var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const states = require("states.js");

var games = {};
var id = 0;\

class Player {
  constructor(pseudo)  {
    this.pseudo = "pseudo";
    this.role: "NONE",
    this.dead: "NONE",
    //this.life_potion: false, //sorcière
    //this.death_potion: true, //sorcière
    //this.lover: true,
    //this.captain: true,
    this.vote: null,
    //this.revealed: false; //voyante
  }
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function updateAllPlayers(game) {
    //TODO send view to all players
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('create_game', function (pseudo) {
    let game = {};
    socket.isMJ = true;
    socket.game = game;
    game.mj = {};
    game.mj.socket = socket;
    game.mj.pseudo = "pseudo";
    game.id = id++;
    game.turn = 0;
    game.state = states.WAITTING_PLAYERS;
    game.players = [];
    game.updatePlayers = function () {updatePlayers(this)};
    socket.on('next', function () {
      socket.game.state = socket.game.state.next();
      updateAllPlayers(game);
    });
    updateAllPlayers(game);
  });
  socket.on('join_game', function(pseudo, code) {
    const id = decrypt(code);
    let game = games.first(game => game.id == id);
    if (game.state = states.WAITING_PLAYERS) {
      let player = new Player();
      socket.game = game;
      socket.player = player;
      player.socket = socket;
      game.player.push(player);
      states.forEach(function (state) {
        state.actions.forEach(function (action) {
          socket.on(action.name, function(param){
            action.fct(socket.game, socket.player, param);
          });
        })
      });
    } else {
      //TODO Handle reconnection
    }
    updateAllPlayers(game);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
