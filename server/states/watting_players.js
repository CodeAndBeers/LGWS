let states = require("./states.js");

exports = {
  name: "WAITTING_PLAYERS",
  next: function(game) {
    return states.DAY_VOTE;
  },
  actions: []
}
