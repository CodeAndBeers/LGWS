import {Component, OnInit, Input} from "angular2/core";
import {GameService, GameUpdate, Player, DeathReasons} from "../game/game-service";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'player-vote',
	templateUrl: 'player-vote/player-vote.html'
})
class PlayerVoteComponent extends GameAwareComponent implements OnInit {

	players: Player[];
	hasVoted: boolean = false;
	isMJ: boolean;
	@Input('voteFn') voteFn: (playerName:string) => any;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('PlayerVoteComponent instantiated');
	}
	
	vote(playerName: string) {
		console.log(this.voteFn);
		if (this.voteFn) {
			this.voteFn(playerName);
		} else {
			this.gameService.voteForPlayer(playerName);
		}
		this.hasVoted = true;
	}
	
	onGameUpdate(data: GameUpdate) {
		this.players = data.players
			.filter(player => player.pseudo !== this.gameService.getCurrentPlayer().pseudo)
			.filter(player => player.dead !== DeathReasons.NONE);
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {PlayerVoteComponent};
