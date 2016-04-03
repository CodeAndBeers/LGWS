const abstract_vote = require("../abstract_vote.js");

let state = {
  name: "DAY_RESULT",
  next: function(game) {
    const states = require("../states.js");
    return abstract_vote.validate_vote(game,
      (game) => states.DAY_VOTE,
      (game, winner) => {
        if (game.turn == 0) {
          winner.captain = true;
          console.log(winner.pseudo + " was elected as the new leader !");
          return states.NIGHT;
        }
        winner.dead = "DAY_VOTE";
        console.log(winner.pseudo + " was designated as the next hanged !");
        if (winner.role.name === "HUNTER") {
          game.after_hunter_revenge = states.NIGHT;
          return states.HUNTER_REVENGE;
        }
        return states.NIGHT;
      }
    );
  },
  actions: []
}

module.exports = state;
