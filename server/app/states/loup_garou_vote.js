const LOUP_GAROU_RESULT = require("./loup_garou_result.js");
const abstract_vote = require("../abstract_vote.js")

let state = {
  name: "LOUP_GAROU_VOTE",
  next: function(game) {
    return LOUP_GAROU_RESULT;
  },
  actions: []
}

state.actions.push({
  name: "loup_garou_vote",
  fct: abstract_vote.vote
});

module.exports = state;
