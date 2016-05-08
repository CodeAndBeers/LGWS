let DAY_VOTE = require("./day_vote.js");
let ROLES = require("../roles.js");
let HUNTER_REVENGE = require("./hunter_revenge.js");
let CAPTAIN_DELEGATION = require("./captain_delegation.js");

let state = {
  name: "RESOLVE_DEATH",
  init: function(game) {

    if (game.deads_today.length > 0) {
      let dead_player = game.deads_today.pop();
      console.log("On this beautiful morning, we discovered the body a player " + dead_player.pseudo);

      if (dead_player.lover) {
        game.players.forEach(maybe_lover => {
          console.log("Test lover", maybe_lover.pseudo);
          if (maybe_lover.isAlive() && maybe_lover.lover && maybe_lover != dead_player) {
            maybe_lover.dead = "LOVER";
            game.deads_today.push(maybe_lover);
            console.log(maybe_lover.pseudo + " died from his lover death " + dead_player.pseudo);
          }
        });
      }

      if (dead_player.role === ROLES.HUNTER.name) {
        console.log("RESOLVE_DEATH: On Hunter revenge");
        return HUNTER_REVENGE;
      }

      if (dead_player.captain) {
        console.log("RESOLVE_DEATH: captain delegation");
        return CAPTAIN_DELEGATION;
      }

      //On continue de dépiler
      console.log("RESOLVE_DEATH: continue");
      return game.gameOver() || this;
    }
    console.log("RESOLVE_DEATH: after_resolve_death");
    return game.gameOver() || this.next(game);
  },
  next: function(game) {
      return game.after_resolve_death;
  },
  actions: []
}

module.exports = state;
