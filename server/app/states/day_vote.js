const DAY_RESULT = require("./day_result.js");

let state = {
  name: "DAY_VOTE",
  next: function(game) {
    return DAY_RESULT;
  },
  actions: []
}

state.actions.push({
  name: "vote",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name && player.vote == null) {
      var candidate = game.players.findByPseudo(param.player_pseudo);
      if (candidate) {
        if (candidate.vote_count) {
          candidate.vote_count++;
        } else {
          candidate.vote_count = 1;
        }
      }
      player.vote = candidate;
      console.info(player.pseudo + " voted for " + param.player_pseudo);
      game.updateAllPlayers();
    }
  }
});

module.exports = state;
