let DAY_RESULT = require("./day_result.js");

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
    if (game.state = states.DAY_VOTE && player.vote == null) {
      player.vote = param.vote;
    }
    updatePlayer();
  }
})

module.exports = state;
