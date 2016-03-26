exports = {
  register: function (state) {
    this[state.name] = state;
  }
}

// exports = {
//  WAITING_PLAYERS:
//  DISTRIBUTE_ROLE:
//  HUNTER:{
//    name: "HUNTER",
//    next: function(game) {
//       return states.DAY_VOTE;
//    }
//  },
//  DAY_VOTE: ,
//  DAY_RESULT: ,
//  NIGHT: {
//    name: "NIGHT",
//    next: function(game) {
//      if (game.players.turn == 1) {
//        return states.CUPIDON;
//      } else {
//        return states.VOYANTE;
//      }
//    }
//  },
//  CUPIDON: {
//    name: "CUPIDON",
//    next: function(game) {
//      return states.VOYANTE;
//    }
//  },
//  VOYANTE: {
//    next: function(game) {
//      return states.VOYANTE_REVEAL;
//    }
//  },
//  VOYANTE_REVEAL: {
//    next: function(game) {
//      return states.LOUG_GAROU_VOTE;
//    }
//  },
//  LOUP_GAROU_VOTE: {
//    next: function(game) {
//      if (game.player.every(player => player.vote)) {
//        return states.LOUP_GAROU_RESULT;
//      } else {
//        return states.LOUP_GAROU_VOTE;
//      }
//  },
//  LOUP_GAROU_RESULT:{
//    next: function(game) {
//      return states.SORCIERE;
//    }
//  },
//  SORCIERE: {
//    next: function(game) {
//      if (/*chasseur est mort cette nuit*/) {
//        return states.HUNTER;
//      } else {
//        return states.DAY_VOTE;
//      }
//    }
//  }
// }
