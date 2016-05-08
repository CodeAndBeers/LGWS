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
        } else {
          winner.dead = "DAY_VOTE";
          game.deads_today.push(winner);
          console.log(winner.pseudo + " was designated as the next hanged !");
          game.after_resolve_death = states.NIGHT;
          return game.gameOver() || states.RESOLVE_DEATH;
        }
      }
    );
  },
  actions: []
}

module.exports = state;
