import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";
import {PlayerVoteComponent} from "../player-vote/player-vote.component";

@Component({
	selector: 'loup-garou-vote',
	templateUrl: 'loup-garou-vote/loup-garou-vote.html',
	directives: [PlayerVoteComponent]
})
class LoupGarouVoteComponent implements OnInit {

	players: Player[];
	isLoupGarou: boolean;
	isMJ: boolean;

	constructor(private gameService: GameService) {
		console.log('LoupGarouVoteComponent instantiated');
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

	vote(playerPseudo: string) {
		console.log('Loup Garou vote for ' + playerPseudo);
		this.gameService.loupGarouVoteForPlayer(playerPseudo);
	}

	private onGameUpdate(data: GameUpdate) {
		this.players = data.players;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isLoupGarou = this.gameService.isCurrentPlayerLoupGarou();
	}

}

export {LoupGarouVoteComponent};
