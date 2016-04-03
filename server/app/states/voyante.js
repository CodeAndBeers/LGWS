const LOUP_GAROU_VOTE = require("./loup_garou_vote.js");

let state = {
  name: "VOYANTE",
  init: function(game) {
    let voyante = game.players.getVoyante();
    if (!voyante || !voyante.isAlive()) {
      //Skip state
      return next();
    }
  },
  next: function(game) {
      delete game.revealed;
      return LOUP_GAROU_VOTE;
  },
  actions: []
}

state.actions.push({
  name: "reveal",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      if (!game.revealed) {
        let revealed_player = game.players.findByPseudo(param.player_pseudo);
        revealed_player.revealed = true;
        game.revealed = true;
      } else {
        console.log("Can't reveal twice in one turn !");
      }
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
