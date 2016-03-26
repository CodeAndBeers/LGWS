let DAY_VOTE = require("./day_vote.js");

let state ={
  name: "WAITING_PLAYERS",
  next: function(game) {
    return DAY_VOTE;
  },
  actions: []
}

module.exports = state;
