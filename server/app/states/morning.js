let DAY_VOTE = require("./day_vote.js");
let ROLES = require("../roles.js")
let RESOLVE_DEATH = require("./resolve_death.js")

let state = {
  name: "MORNING",
  init: function(game) {
    // reset all players last_dead variable
    for (let player in game.players) if (player.last_dead) delete player.last_dead;
    game.turn++;
    //Nothing to do in morning
    return game.gameOver() || this.next(game);
  },
  next: function(game) {
      game.after_resolve_death = DAY_VOTE;
      return RESOLVE_DEATH;
  },
  actions: []
}

module.exports = state;
