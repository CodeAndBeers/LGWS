let encryption = require('./encryption.js');

var timing = 1;

let mj = require('socket.io-client').connect('http://localhost:3000');
mj.on('connect', function () {
  console.log("MJ Connected !");
  mj.emit("create_game", { pseudo: 'PhiloW' });
  mj.on('game_update', function(game) {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    console.log("====GAME====");
    console.log(JSON.stringify(game, null, 2));
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
let v1 = joinTestPlayer("VILLAGEOIS_1", "VILLAGEOIS");
let v2 = joinTestPlayer("VILLAGEOIS_2", "VILLAGEOIS");
let w = joinTestPlayer("WITCH", "WITCH");
let h = joinTestPlayer("HUNTER", "HUNTER");
let c = joinTestPlayer("CUPIDON", "CUPIDON");
let v = joinTestPlayer("VOYANTE", "VOYANTE");
let lg1 = joinTestPlayer("LOUP_GAROU_1", "LOUP_GAROU");
let lg2 = joinTestPlayer("LOUP_GAROU_2", "LOUP_GAROU");
let lg3 = joinTestPlayer("LOUP_GAROU_3", "LOUP_GAROU");

Promise.all([v1, v2, w, h, v, v, lg1, lg2, lg3]).then(function (values) {
  console.log("then");
  let v1 = values[0];
  let v2 = values[1];
  let w = values[2];
  let h = values[3];
  let c = values[4];
  let v = values[5];
  let lg1 = values[6];
  let lg2 = values[7];
  let lg3 = values[8];

  function p(player, action, param) {
    setTimeout(function () {
      player.emit(action, param);
    }, timing++ * 5000);
  }

  p(mj, "next")//-> DISTRIBUTE_ROLE
  p(mj,"next", {VILLAGEOIS: 2});//-> DAY_VOTE

  p(v1, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(v2, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(w, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(h, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(c, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(v, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(lg1, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(lg2, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(lg3, "vote", {player_pseudo: 'VILLAGEOIS_1'});

  p(mj, "next")//-> DAY_RESULT
  p(mj, "next")//-> NIGHT
  p(mj, "next")//-> CUPIDON
  p(c, "vote_cupidon", {player_pseudo: 'VILLAGEOIS_1'});
  p(c, "vote_cupidon", {player_pseudo: 'VOYANTE'});
  p(mj, "next")//-> VOYANTE
  p(v, "reveal", {player_pseudo: 'WITCH'})
  p(mj, "next")//-> LOUP_GAROU_VOTE
  p(lg1, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(lg2, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(lg3, "vote", {player_pseudo: 'VILLAGEOIS_1'});
  p(mj, "next")//-> LOUP_GAROU_RESULT
  p(mj, "next")//-> WITCH
  p(player2, "use_life_potion", {player_pseudo: 'VILLAGEOIS_1'});
  p(player2, "use_death_potion", {player_pseudo: 'LOUP_GAROU_1'});
  p(mj, "next")//-> NEXT_DAY
});
