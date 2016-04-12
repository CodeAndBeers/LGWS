import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";
import {PlayerVoteComponent} from "../player-vote/player-vote.component";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'captain-vote',
	templateUrl: 'captain-vote/captain-vote.html',
	directives: [PlayerVoteComponent]
})
class CaptainVoteComponent extends GameAwareComponent implements OnInit {

	isMJ: boolean;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('CaptainVoteComponent instantiated');
	}
	
	next() {
		console.log('next');
		this.gameService.nextState();
	}

	onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {CaptainVoteComponent};
