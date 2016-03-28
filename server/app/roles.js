module.exports = {
  VILLAGEOIS: {
    name: "VILLAGEOIS"
  },
  LOUP_GAROU:{
    name: "LOUP_GAROU"
  },
  WITCH:{
    name: "WITCH",
    init: function (player) {
      console.log("Init " + player.pseudo + " as witch");
      player.life_potion = 1;
      player.death_potion = 1;
    }
  },
  VOYANTE:{
    name: "VOYANTE"
  },
  CUPIDON: {
    name: "CUPIDON"
  },
  HUNTER: {
    name: "HUNTER"
  }
};
