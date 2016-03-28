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
 WITCH: require("./states/witch.js"),
 // DISTRIBUTE_ROLE:
 // HUNTER:{
 //   name: "HUNTER",
 //   next: function(game) {
 //      return states.DAY_VOTE;
 //   }
 // }
}
//Death by grief
//Captain delegation
//Captain vote * 2
//Reset on revote
//Abstract vote system
