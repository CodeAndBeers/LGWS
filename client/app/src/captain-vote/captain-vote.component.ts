import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";
import {PlayerVoteComponent} from "../player-vote/player-vote.component";

@Component({
	selector: 'captain-vote',
	templateUrl: 'captain-vote/captain-vote.html',
	directives: [PlayerVoteComponent]
})
class CaptainVoteComponent implements OnInit {

	players: Player[];
	isMJ: boolean;

	constructor(private gameService: GameService) {
		console.log('CaptainVoteComponent instantiated');
	}

	ngOnInit() {
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
	}

	private onGameUpdate(data: GameUpdate) {
		this.players = data.players;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {CaptainVoteComponent};
