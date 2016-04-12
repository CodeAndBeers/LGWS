import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'captain-result',
	templateUrl: 'captain-result/captain-result.html'
})
class CaptainResultComponent extends GameAwareComponent implements OnInit {

	players:Player[];
	winners:Player[];
	isMJ:boolean;

	constructor(gameService:GameService) {
		super(gameService);
		console.log('CaptainResultComponent instantiated');
	}
	
	next() {
		console.log('next');
		this.gameService.nextState();
	}

	isWinner(player) {
		return this.winners.map(w => w.pseudo).find(p => p === player.pseudo);
	}

	onGameUpdate(data:GameUpdate) {
		this.players = data.players;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.winners = this.players.map(p => [p]).reduce(function (prev, cur) {
			var prev_count = prev[0].vote_count || 0;
			var cur_count = cur[0].vote_count || 0;
			if (prev_count < cur_count) {
				return cur;
			} else if (prev_count > cur_count) {
				return prev;
			} else {
				prev.push(cur[0]);
				return prev;
			}
		});
	}
}

export {CaptainResultComponent};
