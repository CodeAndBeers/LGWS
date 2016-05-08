let DAY_VOTE = require("./day_vote.js");
let ROLES = require("../roles.js")
let STATES = require("../states.js")

let state = {
  name: "RESOLVE_DEATH",
  init: function(game) {

    if (game.deads_today.length > 0) {
      let dead_player = game.deads_today.pop();
      console.log("On this beautiful morning, we discovered the body a player " + dead_player.pseudo);
      if (dead_player.role === ROLES.HUNTER) {
        return STATES.HUNTER_REVENGE;
      }
      if (dead_player.lover) {
        for (let maybe_lover in game.players) {
          if (!maybe_lover.dead && maybe_lover.lover && maybe_lover != dead_player) {
            maybe_lover.dead = "LOVER";
            game.deads_today.push(maybe_lover);
            console.log(maybe_lover.pseudo + " died from his lover death " + maybe_lover.pseudo);
          }
        }
      }
      //On continue de dépiler
      return this;
    }
    return game.gameOver() || this.next();
  },
  next: function(game) {
      return game.after_resolve_death;
  },
  actions: []
}

module.exports = state;
