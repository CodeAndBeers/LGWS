const VOYANTE = require("./voyante.js");

let state = {
  name: "CUPIDON",
  next: function(game) {
      return VOYANTE;
  },
  actions: []
}

state.actions.push({
  name: "vote",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      let nb_lover = game.players.map(player => player.lover ? 1 : 0).reduce((prev, cur) => prev + cur);
      if (nb_lover < 2) {
        let new_lover = game.players.findByPseudo(param.name);
        new_lover.lover = true;
      }
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
