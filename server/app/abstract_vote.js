
module.exports.vote = function (game, player, param) {
  if (!(player.vote)) {
    var candidate = game.players.findByPseudo(param.player_pseudo);
    if (candidate) {
      if (candidate.vote_count) {
        candidate.vote_count++;
      } else {
        candidate.vote_count = 1;
      }
    }
    player.vote = candidate;
    console.info(player.pseudo + " voted for " + param.player_pseudo);
    game.updateAllPlayers();
  }
};
