let DAY_VOTE = require("./day_vote.js");

let state = {
  name: "WITCH",
  init: function(game) {
    let witch = game.players.getWitch();
    if (!witch || !witch.isAlive()) {
      //Skip state
      return next();
    }
  },
  next: function(game) {
    return DAY_VOTE;
  },
  actions: []
}

state.actions.push({
  name: "use_death_potion",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      if (player.death_potion > 0) {
        player.death_potion--;
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
  name: "use_life_potion",
  fct:  function(game, player, param)  {
    if (game.state.name === state.name) {
      if (player.life_potion > 0) {
        player.life_potion--;
        let player_to_save = game.players.findByPseudo(param.player_pseudo);
        delete player_to_save.dead;
        console.log(player_to_save.pseudo + " was saved by the witch");
      } else {
        console.log("Witch don't have enough potion to save " + param.player_pseudo);
      }
    }
    game.updateAllPlayers();
  }
});

module.exports = state;
