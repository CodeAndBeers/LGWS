let CUPIDON = require("./cupidon.js");
//let VOYANTE = require("./voyante.js");
const GAME_OVER = require("./game_over.js");

let state = {
  name: "NIGHT",
  next: function(game) {
    if (game.turn == 0) {
      return CUPIDON;
    } else {
      return GAME_OVER;
    }
  },
  actions: []
}

module.exports = state;
