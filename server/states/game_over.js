let states = require("./states.js");

exports = {
  name: "GAME_OVER",
  next: function(game) {
    return states.END_GAME;
  }
},
  actions: []
}
