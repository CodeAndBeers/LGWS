import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';

@Component({
	selector: 'cupidon-vote',
	templateUrl: 'cupidon-vote/cupidon-vote.html'
})
class CupidonVoteComponent implements OnInit {

	isMJ: boolean;
	isCupidon: boolean;

	constructor(private gameService: GameService) {
		console.log('CupidonVoteComponent instantiated');
	}

	ngOnInit() {
		this.onGameUpdate(this.gameService.getLastGameUpdate());
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
	}

	next() {
		console.log('next');
		this.gameService.nextState();
	}

	private onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isCupidon = this.gameService.isCurrentPlayerCupidon();
	}

}

export {CupidonVoteComponent};
