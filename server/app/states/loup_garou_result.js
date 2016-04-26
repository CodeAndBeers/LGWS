const abstract_vote = require("../abstract_vote.js");

let state = {
  name: "LOUP_GAROU_RESULT",
  next: function(game) {
    const states = require("../states.js");
    return abstract_vote.validate_vote(game,
      (game) => states.LOUP_GAROU_VOTE,
      (game, winner) => {
        winner.dead = "LOUP_GAROU_VOTE";
        winner.last_dead = true;
        console.log(winner.pseudo + " was savagely eaten by a warewolf!");
        return states.WITCH;
      }
    );
  },
  actions: []
}

module.exports = state;
