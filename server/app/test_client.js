let mj = require('socket.io-client').connect('http://localhost:3000');

mj.on('connect', function () {
  console.log("MJ Connected !");
  mj.emit("create_game", { pseudo: 'PhiloW' });
});

setTimeout(function () {
  let player1 = require('socket.io-client').connect('http://localhost:3000');
  player1.on('connect', function () {
    console.log("Player1 Connected !");
    mj.emit("join_game", { pseudo: 'Linkinou', code: 0});
  });
}, 1000);

setTimeout(function () {
  let player2 = require('socket.io-client').connect('http://localhost:3000');
  player2.on('connect', function () {
    console.log("Player2 Connected !");
    mj.emit("join_game", { pseudo: 'Freedonaab', code: 0});
  });
}, 2000);
