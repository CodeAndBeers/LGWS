import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate} from "../game/game-service";
import {PlayerVoteComponent} from "../player-vote/player-vote.component";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'loup-garou-vote',
	templateUrl: 'loup-garou-vote/loup-garou-vote.html',
	directives: [PlayerVoteComponent]
})
class LoupGarouVoteComponent extends GameAwareComponent implements OnInit {

	isLoupGarou: boolean;
	isMJ: boolean;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('LoupGarouVoteComponent instantiated');
	}

	next() {
		console.log('next');
		this.gameService.nextState();
	}

	vote(playerPseudo: string) {
		console.log('Loup Garou vote for ' + playerPseudo);
		this.gameService.loupGarouVoteForPlayer(playerPseudo);
	}

	onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isLoupGarou = this.gameService.isCurrentPlayerLoupGarou();
	}

}

export {LoupGarouVoteComponent};
