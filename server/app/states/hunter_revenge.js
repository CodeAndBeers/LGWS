const states = require("../states");

let state = {
  name: "HUNTER_REVENGE",
  next: function(game) {
    return game.gameOver() || states.MORNING;
  },
  actions: []
}

state.actions.push({
  name: "revenge",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      let player_to_kill = game.players.findByPseudo(param.player_pseudo);
      player_to_kill.dead = "HUNTER_REVENGE";
      game.deads_today.push(player_to_kill);
      console.log(player.pseudo + " killed " + player_to_kill.pseudo + " in its last breath");
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
