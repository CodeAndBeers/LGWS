let states = require("./states.js");

let state = {
  name: "DAY_RESULT",
  next: function(game) {
    return states.GAME_OVER;
  },
  actions: []
}

exports = state;
states.register(state);
