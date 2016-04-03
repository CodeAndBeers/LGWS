const DAY_RESULT = require("./day_result.js");
const HUNTER_REVENGE = require("./hunter_revenge.js");
const abstract_vote = require("../abstract_vote.js")

let state = {
  name: "DAY_VOTE",
  init: function(game) {
    var last_dead = game.players.find(p => p.last_dead);
    if (last_dead) delete last_dead.last_dead;
    game.turn++;
    let hunter = game.players.getHunter();
    if (hunter && hunter.dead && hunter.dead !== "NONE" && !hunter.take_revenge) {
      game.after_hunter_revenge = state;
      return HUNTER_REVENGE;
    }
  },
  next: function(game) {
    return DAY_RESULT;
  },
  actions: []
}

state.actions.push({
  name: "vote",
  fct: abstract_vote.vote
});

module.exports = state;
