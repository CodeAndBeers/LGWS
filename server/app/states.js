module.exports = {
 WAITING_PLAYERS: require("./states/waiting_players.js"),
 DAY_VOTE: require("./states/day_vote.js"),
 DAY_RESULT: require("./states/day_result.js"),
 NIGHT: require("./states/night.js"),
 CUPIDON: require("./states/cupidon.js"),
 VOYANTE: require("./states/voyante.js"),
 GAME_OVER: require("./states/game_over.js"),
 LOUP_GAROU_VOTE: require("./states/loup_garou_vote.js"),
 LOUP_GAROU_RESULT: require("./states/loup_garou_result.js"),
 // DISTRIBUTE_ROLE:
 // HUNTER:{
 //   name: "HUNTER",
 //   next: function(game) {
 //      return states.DAY_VOTE;
 //   }
 // },
 // SORCIERE: {
 //   next: function(game) {
 //     if (/*chasseur est mort cette nuit*/) {
 //       return states.HUNTER;
 //     } else {
 //       return states.DAY_VOTE;
 //     }
 //   }
 // }
}
