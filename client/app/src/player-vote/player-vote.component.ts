import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";

@Component({
	selector: 'player-vote',
	templateUrl: 'player-vote/player-vote.html'
})
class PlayerVoteComponent implements OnInit {

	players: Player[];
	isMJ: boolean;

	constructor(private gameService: GameService) {
		console.log('PlayerVoteComponent instantiated');
	}

	ngOnInit() {
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
	}

	startGame() {
		console.log('startGame');
		this.gameService.nextState();
	}

	private onGameUpdate(data: GameUpdate) {
		this.players = data.players;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {PlayerVoteComponent};
