let DAY_VOTE = require("./day_vote.js");
let roles = require("../roles.js");

function random(maxValue) {
  return Math.floor(Math.random() * maxValue)
}

function getRoleFieldById(roleDistributionTable, id) {
  let i = 0;
  console.log("Searching role for id " + id);
  for (let r in roleDistributionTable) {
    if (!roles.hasOwnProperty(r)) {
        //The current property is not a direct property of p
        continue;
    }
    if (i == id) {
      console.log("Found role: " + JSON.stringify(r));
      return r;
    }
    i++;
  }
}

let state = {
  name: "DISTRIBUTE_ROLE",
  next: function(game, roleDistributionTable) {
    let roleDistributionTableKeys = Object.keys(roleDistributionTable);
    game.players.forEach(function (player) {
      // chose a role that still has free slots
      let randomRole;
      do {
        let randomRoleIndex = random(roleDistributionTableKeys.length - 1);
        let randomRoleName = roleDistributionTableKeys[randomRoleIndex];
        randomRole = roles[randomRoleName];
      } while (roleDistributionTable[randomRole.name] == 0);
      roleDistributionTable[randomRole.name]--;
      player.role = randomRole;
      if (randomRole.init) {
        randomRole.init(player);
      }
    });
    game.updateAllPlayers();
    return DAY_VOTE;
  },
  actions: []
}

module.exports = state;
