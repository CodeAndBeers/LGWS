let DAY_VOTE = require("./day_vote.js");
let roles = require("../roles.js");

function random(maxValue) {
  return Math.floor(Math.random() * maxValue)
}

function getRoleFieldById(id) {
  let i = 0;
  console.log("Searching role for id " + id);
  for (let r in roles) {
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
    game.players.forEach(function (player) {
      // chose a role that still has free slots
      let randomRole;
      do {
        let randomRoleIndex = random(Object.keys(roleDistributionTable).length - 1);
        randomRole = getRoleFieldById(randomRoleIndex);
      } while (roleDistributionTable[randomRole.name] == 0);
      roleDistributionTable[randomRole.name] = roleDistributionTable[randomRole.name] - 1;
      player.role = randomRole;
    });
    game.updateAllPlayers();
    return DAY_VOTE;
  },
  actions: []
}

module.exports = state;
