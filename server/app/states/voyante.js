//const LOUP_GAROU_VOTE = require("./loup_garou_vote.js");
const GAME_OVER = require("./game_over.js");

let state = {
  name: "VOYANTE",
  next: function(game) {
      delete game.revealed;
      return GAME_OVER;
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
