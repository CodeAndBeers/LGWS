const GAME_OVER = require("./game_over.js");

let state = {
  name: "DAY_RESULT",
  next: function(game) {
    return GAME_OVER;
  },
  actions: []
}

module.exports = state;
