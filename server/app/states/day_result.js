let state = {
  name: "DAY_RESULT",
  next: function(game) {
    const states = require("../states.js");
    var winners = game.players.reduce(function (prev, cur){
      if (!Array.isArray(prev)) {
        prev = [prev];
      }
      var prev_count = prev[0].vote_count || 0;
      var cur_count = cur.vote_count || 0;
      if (prev_count < cur_count) {
        return [cur];
      } else if (prev_count > cur_count){
        return prev;
      } else {
        prev.push(cur);
        return prev;
      }
    });
    console.log("winners: " + winners.map(w => w.pseudo));
    var next_state;
    if(winners.length > 1) {
      next_state = states.DAY_VOTE;
    } else {
      if (game.turn == 0) {
        winners[0].captain = true;
        console.log(winners[0].pseudo + " was elected as the new leader !");
      } else {
        winners[0].dead = "DAY_VOTE";
        console.log(winners[0].pseudo + " was designated as the next hanged !");
      }
      next_state = states.NIGHT;
    }
    game.players.forEach(function (player) {
      delete player.vote;
      delete player.vote_count;
    })
    return next_state;
  },
  actions: []
}

module.exports = state;
