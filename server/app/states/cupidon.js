const VOYANTE = require("./voyante.js");

let state = {
  name: "CUPIDON",
  init: function(game) {
    let cupidon = game.players.getCupidon();
    if (!cupidon || !cupidon.isAlive()) {
      //Skip state
      console.log("Skiping CUPIDON")
      return this.next();
    }
  },
  next: function(game) {
      return VOYANTE;
  },
  actions: []
}

state.actions.push({
  name: "vote_cupidon",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      let nb_lover = game.players.map(player => player.lover ? 1 : 0).reduce((prev, cur) => prev + cur);
      if (nb_lover < 2) {
        console.log("Try finding lover: " + param.player_pseudo);
        let new_lover = game.players.findByPseudo(param.player_pseudo);
        new_lover.lover = true;
      }
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
