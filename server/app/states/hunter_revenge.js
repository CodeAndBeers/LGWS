let state = {
  name: "HUNTER_REVENGE",
  next: function(game) {
    let next = game.after_hunter_revenge;
    delete game.after_hunter_revenge;
    return game.gameOver() || next();
  },
  actions: []
}

state.actions.push({
  name: "revenge",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      if (!player.take_revenge) {
        player.take_revenge = true;
        let player_to_kill = game.players.findByPseudo(param.player_pseudo);
        player_to_kill.dead= "HUNTER_REVENGE";
        console.log(player.pseudo + " killed " + player_to_kill.pseudo + " in its last breath");
      } else {
        console.log("The hunter already took its revenge");
      }
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
