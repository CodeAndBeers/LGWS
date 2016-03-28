let encryption = require('./encryption.js');

let mj, player1, player2;
let timing = 1;

mj = require('socket.io-client').connect('http://localhost:3000');
mj.on('connect', function () {
  console.log("MJ Connected !");
  mj.emit("create_game", { pseudo: 'PhiloW' });
  mj.on('game_update', function(game) {
    console.log("MJ received a game update");
    console.log(JSON.stringify(game));
  })
});

setTimeout(function () {
  player1 = require('socket.io-client').connect('http://localhost:3000');
  player1.on('game_update', function(game) {
    console.log("Player 1 received a game update");
  })
  player1.on('connect', function () {
    console.log("Player1 Connected !");
    player1.emit("join_game", { pseudo: 'Linkinou', code: encryption.encrypt(0)});
  });
}, timing++ * 1000);
setTimeout(function () {
  player2 = require('socket.io-client').connect('http://localhost:3000');
  player2.on('game_update', function() {
    console.log("Player 2 received a game update");
  })
  player2.on('connect', function () {
    console.log("Player2 Connected !");
    player2.emit("join_game", { pseudo: 'Freedonaab', code: encryption.encrypt(0)});
  });
}, timing++ * 1000);

setTimeout(function () {
  //-> DISTRIBUTE_ROLE
  mj.emit("next");
}, timing++ * 1000);

setTimeout(function () {
  //-> DAY_VOTE
  mj.emit("next", { VILLEGEOIS : 2 } );
}, timing++ * 1000);

setTimeout(function () {
  player1.emit("vote", {player_pseudo: 'Linkinou'});
}, timing++ * 1000);

setTimeout(function () {
  player2.emit("vote", {player_pseudo: 'Linkinou'});
}, timing++ * 1000);

setTimeout(function () {
  //-> DAY_RESULT
  mj.emit("next");
}, timing++ * 1000);

setTimeout(function () {
  //-> NIGHT
  mj.emit("next");
}, timing++ * 1000);

setTimeout(function () {
  //-> Cupidon
  mj.emit("next");
}, timing++ * 1000);

setTimeout(function () {
  player1.emit("vote_cupidon", {player_pseudo: 'Linkinou'});
  player2.emit("vote_cupidon", {player_pseudo: 'Freedonaab'});
}, timing++ * 1000);

setTimeout(function () {
  //-> Voyante
  mj.emit("next");
}, timing++ * 1000);

setTimeout(function () {
  player1.emit("reveal", {player_pseudo: 'Linkinou'});
}, timing++ * 1000);

setTimeout(function () {
  //Can't reveal twice in one game
  player1.emit("reveal", {player_pseudo: 'Freedonaab'});
}, timing++ * 1000);

setTimeout(function () {
  //-> LOUP_GAROU_VOTE
  mj.emit("next");
}, timing++ * 1000);

setTimeout(function () {
  player1.emit("loup_garou_vote", {player_pseudo: 'Linkinou'});
}, timing++ * 1000);

setTimeout(function () {
  player2.emit("loup_garou_vote", {player_pseudo: 'Linkinou'});
}, timing++ * 1000);

setTimeout(function () {
  //-> LOUP_GAROU_RESULT
  mj.emit("next");
}, timing++ * 1000);

setTimeout(function () {
  //-> WITCH
  mj.emit("next");
}, timing++ * 1000);

setTimeout(function () {
  player1.emit("use_life_potion", {player_pseudo: 'Linkinou'});
  player1.emit("use_death_potion", {player_pseudo: 'Freedonaab'});
}, timing++ * 1000);

setTimeout(function () {
  //-> Game over
  mj.emit("next");
}, timing++ * 1000);
