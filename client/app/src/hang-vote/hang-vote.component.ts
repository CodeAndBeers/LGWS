import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";
import {PlayerVoteComponent} from "../player-vote/player-vote.component";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'hang-vote',
	templateUrl: 'hang-vote/hang-vote.html',
	directives: [PlayerVoteComponent]
})
class HangVoteComponent extends GameAwareComponent implements OnInit {

	isMJ: boolean;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('HangVoteComponent instantiated');
	}
	
	next() {
		console.log('next');
		this.gameService.nextState();
	}

	onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {HangVoteComponent};
