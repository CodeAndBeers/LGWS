let state = {
  name: "CAPTAIN_DELEGATION",
  next: function(game) {
    const states = require("../states.js");
    return game.gameOver() || states.RESOLVE_DEATH;
  },
  actions: []
}

state.actions.push({
  name: "delegate",
  fct:  function(game, player, param)  {
    console.log("DELEGATE");
    if (game.state.name === state.name) {
      let player_to_delegate = game.players.findByPseudo(param.player_pseudo);
      player_to_delegate.captain = true;
      console.log(player_to_delegate.pseudo + " inherite from all the leadership of " + player.pseudo);
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
