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
	isCurrentPlayerDead: boolean;
	@Input('voteFn') voteFn: (playerName:string) => any;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('PlayerVoteComponent instantiated');
	}
	
	canVote(player: Player): boolean {
		return !this.hasVoted && !this.isMJ && !this.isPlayerDead(player) && !this.isCurrentPlayerDead;
	}
	
	vote(playerName: string) {
		console.log("vote", playerName);
		if (this.voteFn) {
			this.voteFn(playerName);
		} else {
			this.gameService.voteForPlayer(playerName);
		}
		this.hasVoted = true;
	}
	
	onGameUpdate(data: GameUpdate) {
		this.players = GameService.getAllPlayersSorted(data);
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isCurrentPlayerDead = this.gameService.isCurrentPlayerDead();
	}

}

export {PlayerVoteComponent};
