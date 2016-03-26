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
      player.vote = game.players.findByName(param.player_name);
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
