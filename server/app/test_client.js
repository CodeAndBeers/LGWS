let mj = require('socket.io-client').connect('http://localhost:3000');

mj.on('connect', function () {
  console.log("MJ Connected !");
  mj.emit("create_game", { pseudo: 'PhiloW' });
  mj.on('game_update', function(game) {
    console.log("MJ received a game update");
    console.log(JSON.stringify(game));
  })
});

setTimeout(function () {
  let player1 = require('socket.io-client').connect('http://localhost:3000');
  player1.on('game_update', function() {
    console.log("Player 1 received a game update");
  })
  player1.on('connect', function () {
    console.log("Player1 Connected !");
    player1.emit("join_game", { pseudo: 'Linkinou', code: 0});
  });
}, 1000);

setTimeout(function () {
  let player2 = require('socket.io-client').connect('http://localhost:3000');
  player2.on('game_update', function() {
    console.log("Player 2 received a game update");
  })
  player2.on('connect', function () {
    console.log("Player2 Connected !");
    player2.emit("join_game", { pseudo: 'Freedonaab', code: 0});
  });
}, 2000);

setTimeout(function () {
  mj.emit("next");
}, 3000);
