let DAY_VOTE = require("./day_vote.js");

let state = {
  name: "MORNING",
  init: function(game) {
    var last_dead = game.players.find(p => p.last_dead);
    if (last_dead) delete last_dead.last_dead;
    game.turn++;
    let hunter = game.players.getHunter();
    if (hunter && hunter.dead && hunter.dead !== "NONE" && !hunter.take_revenge) {
      game.after_hunter_revenge = next;
      return HUNTER_REVENGE;
    }
    //Nothing to do in morning
    return this.next();
  },
  next: function(game) {
      return DAY_VOTE;
  },
  actions: []
}

module.exports = state;
