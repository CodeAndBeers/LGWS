
module.exports.vote = function (game, player, param) {
  if (!(player.vote)) {
    let candidate = game.players.findByPseudo(param.player_pseudo);
    if (candidate) {
      if (candidate.vote_count) {
        candidate.vote_count++;
      } else {
        candidate.vote_count = 1;
      }
      if (player.captain) candidate.vote_count++;
    }
    player.vote = candidate;
    console.info(player.pseudo + " voted for " + param.player_pseudo);
    game.updateAllPlayers();
  }
};

module.exports.validate_vote = function (game, onVoteFail, onVoteSuccess) {
  let winners = game.players.reduce(function (prev, cur) {
    if (!Array.isArray(prev)) {
      prev = [prev];
    }
    let prev_count = prev[0].vote_count || 0;
    let cur_count = cur.vote_count || 0;
    if (prev_count < cur_count) {
      return [cur];
    } else if (prev_count > cur_count){
      return prev;
    } else {
      prev.push(cur);
      return prev;
    }
  });
  game.players.forEach(function (player) {
    delete player.vote;
    delete player.vote_count;
  })
  if(winners.length > 1) {
    console.log("winners: " + winners.map(w => w.pseudo));
    return onVoteFail(game);
  }
  return onVoteSuccess(game, winners[0]);
}
