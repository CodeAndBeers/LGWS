let MORNING = require("./morning.js");
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
    console.log("DISTRIBUTE_ROLE", roleDistributionTable);
    roleDistributionTable = roleDistributionTable || {};
    let roleDistributionTableKeys = Object.keys(roleDistributionTable);
    game.players.forEach(function (player) {
      if (!player.role || player.role === "NONE") {
        // chose a role that still has free slots
        let randomRole;
        do {
          let randomRoleIndex = random(roleDistributionTableKeys.length);
          let randomRoleName = roleDistributionTableKeys[randomRoleIndex];
          randomRole = roles[randomRoleName];
        } while (roleDistributionTable[randomRole.name] == 0);
        roleDistributionTable[randomRole.name]--;
        player.role = randomRole.name;
        console.log("DISTRIBUTE_ROLE assigning role "+randomRole.name+" to "+player.pseudo);
        if (randomRole.init) {
          randomRole.init(player);
        }
      }
    });
    return MORNING;
  },
  actions: []
}

module.exports = state;
