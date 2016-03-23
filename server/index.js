var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var games = {};

var roles = {
  villegeois: {
    buildView: function(game) {
      let view = {

      }
    }
  },
  loupgarou:,
  sorciere:,
  voyante:,
  capitaine:,
  cupidon:,
  chasseur:,
};


class Game {
  constructor() {
    this.mj = "pseudo";
    this.winner = "";
    this.turn = 45;
    this.state = "";
    this.code = "wxyz";
    this.players = [];
  }
}

new Player() {
  this.pseudo = "pseudo";
  this.role: "",
  this.dead: "REASON",
  this.life_potion: true,
  death_potion: true,
  lover: true,
  captain: true,
  vote: player,
  revealed: false;
}

const states = {
  WAITING_PLAYERS:
  DISTRIBUTE_ROLE:
  CHASSEUR:
  DAY_VOTE: {
    name: "DAY_VOTE",
    next: function(game) {
      return states.DAY_RESULT;
    },

  },
  DAY_RESULT: {
    next: function(game) {
      return states.NIGHT;
    }
  },
  NIGHT: {
    next: function(game) {
      if (game.players.turn == 1) {
        return states.CUPIDON;
      } else {
        return states.VOYANTE;
      }
    },
    action: {}
  },
  CUPIDON: {
    next: function(game) {return "VOYANTE"}
  },
  VOYANTE: {
    next: function(game) {return "LOUG_GAROU_VOTE"}
  },
  VOYANTE_REVEAL: {
    next: function(game) {return "LOUG_GAROU_VOTE"}
  },
  LOUP_GAROU_VOTE: {
    next: function(game) {
      if (game.player.every(player => player.vote)) {
        return states.LOUP_GAROU_RESULT;
      } else {
        return states.LOUP_GAROU_VOTE
      }
  },
  LOUP_GAROU_RESULT:
  SORCIERE:
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('create_game', function (pseudo) {
    let game = new Game();
  });

  //WAITING_PLAYERS
  socket.on('join_game', function(code) {
    let game = games.first(game => game.code == code);
    if (game.state = states.WAITING_PLAYERS) {
      let player = {};
      socket.game = game;
      socket.player = player;
      socket.game.player.push(player);
    }
    updateAllPlayers();
  });

  //DAY_VOTE
  socket.on('vote', function(vote)  {
    if (game.state = states.DAY_VOTE && player.vote == null) {
      player.vote = vote;
    }
    updatePlayer();
  });

  //DAY_RESULT
  //NOTHING


  //
  socket.on('next', function () {
    socket.game.state = socket.game.state.next();
    updateAllPlayers();
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
