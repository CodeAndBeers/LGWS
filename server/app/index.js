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
    this.isAlive = () => this.dead === "NONE";
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
    game.turn = -1;
    game.state = states.WAITING_PLAYERS;
    game.players = [];
    game.deads_today = []; // stack of actions to execute in the morning
    game.players.findByPseudo = function (pseudo) {
      return game.players.find(player => player.pseudo === pseudo);
    };
    game.players.getHunter = function () {
      return game.players.find(player => player.role === roles.HUNTER.name);
    };
    game.players.getVoyante = function () {
      return game.players.find(player => player.role === roles.VOYANTE.name);
    };
    game.players.getWitch = function () {
      return game.players.find(player => player.role === roles.WITCH.name);
    };
    game.players.getCupidon = function () {
      return game.players.find(player => player.role === roles.CUPIDON.name);
    };
    game.players.getPlayerAlive = function() {
      return game.players.filter(p => p.dead === "NONE");
    };
    game.getWinners = function() {
      var playerAlive = game.players.getPlayerAlive();
      if (playerAlive.length == 2 && playerAlive[0].lover && playerAlive[1].lover) {
          return "LOVERS";
      }
      if (playerAlive.filter(player => player.role === roles.LOUP_GAROU.name).length == 0) {
        return "VILLAGEOIS";
      }
      if (playerAlive.filter(player => player.role !== roles.LOUP_GAROU.name).length <= 1) {
        return "LOUP_GAROU";
      }
    };
    game.gameOver = function () {
      var winners = game.getWinners();
      if (winners) {
        game.winners = winners;
        return states.GAME_OVER;
      }
    };

    game.updateAllPlayers = function() {updateAllPlayers(game)};
    games[game.id] = game;

    if (fn) {
      fn({ result: 'ok', id: encryption.encrypt(game.id) });
    }

    //game.updatePlayers = function () {updatePlayers(this)};
    socket.on('next', function (param) {
      socket.game.state = socket.game.state.next(game, param);
      console.log("Moving to state '" + JSON.stringify(socket.game.state) + "' with param ["+ JSON.stringify(param) +"]");
      let tmp_next = socket.game.state;
      while (tmp_next && tmp_next.init) {
        tmp_next = tmp_next.init(game);
        if (tmp_next) {
          socket.game.state = tmp_next;
        }
      }
      console.log("Finally moved to state '", JSON.stringify(socket.game.state));
      updateAllPlayers(game);
    });
    updateAllPlayers(game);
  });

  socket.on('join_game', function(data, fn) {
    const id = encryption.decrypt(data.code);
    console.log(id);
    let game = games[id];
    // check that user name doesn't exist
    for (let name in game.players) {
      if (name === data.pseudo) {
        console.log("Couldn't add player, name already exist");
        fn({ result: 'ko', message: "Player name was already taken" });
      }
    }
    console.log("Join game id:" + game.id);
    if (game.state.name === states.WAITING_PLAYERS.name) {
      console.log("Add player");
      let player = new Player(data.pseudo);
      socket.game = game;
      socket.player = player;
      player.socket = socket;
      game.players.push(player);
      for (let state_name in states) {
        let state = states[state_name];
        console.log("Register state: " + state.name);
        state.actions.forEach(function (action) {
          console.log("Register action: " + action.name);
          socket.on(action.name, function(param) {
            if (game.state.name === state.name) {
              action.fct(socket.game, socket.player, param);
            } else {
              console.log("Trying to do action '"+action.name+"' on state '"+state.name+"' while game state is '"+game.state.name+"'");
            }
          });
        })
      }
      if (data.force_role) {
        console.log("Force " + player.pseudo + " as " + data.force_role);
        player.role = roles[data.force_role].name;
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
