const DAY_RESULT = require("./day_result.js");
const abstract_vote = require("../abstract_vote.js")

let state = {
  name: "DAY_VOTE",
  next: function(game) {
    return DAY_RESULT;
  },
  actions: []
}

state.actions.push({
  name: "vote",
  fct: abstract_vote.vote
});

module.exports = state;
