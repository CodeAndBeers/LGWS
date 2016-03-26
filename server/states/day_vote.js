let states = require("./states.js");

let state = {
  name: "DAY_VOTE",
  next: function(game) {
    return states.DAY_RESULT;
  },
  actions: []
}

state.actions.push({
  name: "vote",
  fct:  function(game, player, vote)  {
    if (game.state = states.DAY_VOTE && player.vote == null) {
      player.vote = vote;
    }
    updatePlayer();
  }
})

exports = state;
states.register(state);
