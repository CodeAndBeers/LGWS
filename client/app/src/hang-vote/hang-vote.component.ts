import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";
import {PlayerVoteComponent} from "../player-vote/player-vote.component";

@Component({
	selector: 'hang-vote',
	templateUrl: 'hang-vote/hang-vote.html',
	directives: [PlayerVoteComponent]
})
class HangVoteComponent implements OnInit {

	players: Player[];
	isMJ: boolean;

	constructor(private gameService: GameService) {
		console.log('HangVoteComponent instantiated');
	}

	ngOnInit() {
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
		this.onGameUpdate(this.gameService.getLastGameUpdate());
	}

	next() {
		console.log('next');
		this.gameService.nextState();
	}

	private onGameUpdate(data: GameUpdate) {
		this.players = data.players;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {HangVoteComponent};
