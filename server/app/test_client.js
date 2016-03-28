let encryption = require('./encryption.js');

var timing = 1;

let mj = require('socket.io-client').connect('http://localhost:3000');
mj.on('connect', function () {
  console.log("MJ Connected !");
  mj.emit("create_game", { pseudo: 'PhiloW' });
  mj.on('game_update', function(game) {
    console.log(JSON.stringify(game));
  })
});

function joinTestPlayer(name, role) {
  return new Promise(function (resolve, reject) {
      var test_player = require('socket.io-client').connect('http://localhost:3000');
      test_player.on('connect', function () {
        console.log(name + " Connected !");
        test_player.emit("join_game", { pseudo: name, code: encryption.encrypt(0), force_role: role});
        resolve(test_player);
      });
  });
}
let joinWitch1 = joinTestPlayer("Linkinou", "WITCH");
let joinWitch2 = joinTestPlayer("Freedonaab", "WITCH");

Promise.all([joinWitch1, joinWitch2]).then(function (values) {
  console.log("then");
  var player1 = values[0];
  var player2 = values[1];

  function p(player, action, param) {
    setTimeout(function () {
      player.emit(action, param);
    }, timing++ * 1000);
  }

  p(mj, "next")//-> DISTRIBUTE_ROLE
  p(mj,"next", {VILLEGEOIS: 2});//-> DAY_VOTE
  p(player1, "vote", {player_pseudo: 'Linkinou'});
  p(player2, "vote", {player_pseudo: 'Linkinou'});
  p(mj, "next")//-> DAY_RESULT
  p(mj, "next")//-> NIGHT
  p(mj, "next")//-> CUPIDON
  p(player1, "vote_cupidon", {player_pseudo: 'Linkinou'});
  p(player1, "vote_cupidon", {player_pseudo: 'Freedonaab'});
  p(mj, "next")//-> VOYANTE
  p(player1, "reveal", {player_pseudo: 'Linkinou'})
  p(player1, "reveal", {player_pseudo: 'Freedonaab'})
  p(mj, "next")//-> LOUP_GAROU_VOTE
  p(player1, "loup_garou_vote", {player_pseudo: 'Linkinou'});
  p(player2, "loup_garou_vote", {player_pseudo: 'Linkinou'});
  p(mj, "next")//-> LOUP_GAROU_RESULT
  p(mj, "next")//-> WITCH
  p(player2, "use_life_potion", {player_pseudo: 'Linkinou'});
  p(player2, "use_death_potion", {player_pseudo: 'Freedonaab'});
  p(mj, "next")//-> NEXT_DAY
});
