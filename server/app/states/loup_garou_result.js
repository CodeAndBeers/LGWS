let state = {
  name: "LOUP_GAROU_RESULT",
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
      next_state = states.LOUP_GAROU_VOTE;
    } else {
      winners[0].dead = "LOUP_GAROU_VOTE";
      console.log(winners[0].pseudo + " was savagely eaten by a warewolf!");
      next_state = states.WITCH;
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
