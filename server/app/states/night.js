let CUPIDON = require("./cupidon.js");
let VOYANTE = require("./voyante.js");

let state = {
  name: "NIGHT",
  next: function(game) {
    if (game.turn == 0) {
      return CUPIDON;
    } else {
      return VOYANTE;
    }
  },
  actions: []
}

module.exports = state;
