import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";

@Component({
	selector: 'player-vote',
	templateUrl: 'player-vote/player-vote.html'
})
class PlayerVoteComponent implements OnInit {

	players: Player[];
	hasVoted: boolean = false;
	isMJ: boolean;

	constructor(private gameService: GameService) {
		console.log('PlayerVoteComponent instantiated');
	}

	ngOnInit() {
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
		
		const gameUpdate = this.gameService.getLastGameUpdate();
		if (gameUpdate) this.onGameUpdate(gameUpdate);
	}
	
	vote(playerName: string) {
		this.gameService.voteForPlayer(playerName);
		this.hasVoted = true;
	}
	
	private onGameUpdate(data: GameUpdate) {
		this.players = data.players.filter(player => player.pseudo !== this.gameService.getCurrentPlayer().pseudo);
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {PlayerVoteComponent};
