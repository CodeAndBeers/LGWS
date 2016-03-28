const GAME_OVER = require("./game_over.js");

let state = {
  name: "WITCH",
  next: function(game) {
      return GAME_OVER;
  },
  actions: []
}

state.actions.push({
  name: "user_death_potion",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      player.death_potion = 1;
      if (player.death_potion > 0) {
        let player_to_kill = game.players.findByPseudo(param.player_pseudo);
        player_to_kill.dead= "DEATH_BY_WITCH";
        console.log(player_to_kill.pseudo + " drunk the death potion offered by the witch");
      } else {
        console.log("Witch don't have enough potion to kill " + param.player_pseudo);
      }
    }
    game.updateAllPlayers();
  }
});

state.actions.push({
  name: "user_life_potion",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      player.life_potion = 1;
      if (player.life_potion > 0) {
        let player_to_save = game.players.findByPseudo(param.player_pseudo);
        player_to_save.dead = "ALIVE_BY_WITCH";
        console.log(player_to_save.pseudo + " was saved by the witch");
      } else {
        console.log("Witch don't have enough potion to save " + param.player_pseudo);
      }
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
