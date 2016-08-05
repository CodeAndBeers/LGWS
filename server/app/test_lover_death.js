let encryption = require('./encryption.js');

var timing = 1;

let mj = require('socket.io-client').connect('http://localhost:3000');
mj.on('connect', function () {
  console.log("MJ Connected !");
  mj.emit("create_game", { pseudo: 'PhiloW' });
  mj.on('game_update', function(game) {
    // process.stdout.write("\u001b[2J\u001b[0;0H");
    // console.log("====GAME====");
    console.log(JSON.stringify(game, null, 2));
  })
});

function joinTestPlayer(name, role) {
  return new Promise(function (resolve, reject) {
      var test_player = require('socket.io-client').connect('http://localhost:3000');
      test_player.on('connect', function () {
        console.log(name + " Connected !");
        test_player.name = name;
        test_player.emit("join_game", { pseudo: name, code: encryption.encrypt(0), force_role: role});
        resolve(test_player);
      });
  });
}

let v1 = joinTestPlayer("VILLAGEOIS_1", "VILLAGEOIS");
let v2 = joinTestPlayer("VILLAGEOIS_2", "VILLAGEOIS");
let h = joinTestPlayer("HUNTER", "HUNTER");
let c = joinTestPlayer("CUPIDON", "CUPIDON");
let lg1 = joinTestPlayer("LOUP_GAROU_1", "LOUP_GAROU");

Promise.all([v1, v2, h, c, lg1]).then(function (values) {
  var i = 0;
  let v1 = values[i++];
  let v2 = values[i++];
  let h = values[i++];
  let c = values[i++];
  let lg1 = values[i++];

  function p(player, action, param) {
    setTimeout(function () {
      console.log(player.name, action, param);
      player.emit(action, param);
    }, timing++ * 1000);
  }

  p(mj, "next")//-> DISTRIBUTE_ROLE
  p(mj, "next", {VILLAGEOIS: 2});//-> DAY_VOTE

  // player mayor election
  p(v1, "vote", {player_pseudo: 'HUNTER'});
  p(c, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(lg1, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(h, "vote", {player_pseudo: 'VILLAGEOIS_1'});

  p(mj, "next")//-> DAY_RESULT
  p(mj, "next")//-> NIGHT
  p(mj, "next")//-> CUPIDON
  p(c, "vote_cupidon", {player_pseudo: 'VILLAGEOIS_1'});
  p(c, "vote_cupidon", {player_pseudo: 'HUNTER'});

  p(mj, "next")//-> LOUP_GAROU_VOTE
  p(lg1, "loup_garou_vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(mj, "next")//-> LOUP_GAROU_RESULT
  p(mj, "next")//-> HUNTER_REVENGE
  p(h, "revenge", {player_pseudo: 'CUPIDON'});
  p(mj, "next")//-> END_GAME

});
