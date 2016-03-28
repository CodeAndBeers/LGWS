let DISTRIBUTE_ROLE = require("./distribute_role.js");

let state = {
  name: "WAITING_PLAYERS",
  next: function(game) {
    return DISTRIBUTE_ROLE;
  },
  actions: []
}

module.exports = state;
