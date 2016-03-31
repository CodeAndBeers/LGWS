import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";

@Component({
	selector: 'captain-result',
	templateUrl: 'captain-result/captain-result.html'
})
class CaptainResultComponent implements OnInit {

	players: Player[];
	winners: Player[];
	isMJ: boolean;

	constructor(private gameService: GameService) {
		console.log('CaptainResultComponent instantiated');
	}

	ngOnInit() {
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
		this.onGameUpdate(this.gameService.getLastGameUpdate());
	}

	isWinner(player) {
		return this.winners.map(w => w.pseudo).find(player.pseudo);
	}

	private onGameUpdate(data: GameUpdate) {
		console.log("toto");
		this.players = data.players;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.winners = this.players.map(p => [p]).reduce(function (prev, cur){
      var prev_count = prev[0].vote_count || 0;
      var cur_count = cur[0].vote_count || 0;
      if (prev_count < cur_count) {
        return cur;
      } else if (prev_count > cur_count){
        return prev;
      } else {
        prev.push(cur[0]);
        return prev;
      }
    });
	}

}

export {CaptainResultComponent};
