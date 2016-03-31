import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';

@Component({
	selector: 'cupidon-vote',
	templateUrl: 'cupidon-vote/cupidon-vote.html'
})
class CupidonVoteComponent implements OnInit {

	isMJ: boolean;
	isCupidon: boolean;
	players: Player[];
	hasVoted: boolean = false;
	lover1: string;
	lover2: string;

	constructor(private gameService: GameService) {
		console.log('CupidonVoteComponent instantiated');
	}

	ngOnInit() {
		this.onGameUpdate(this.gameService.getLastGameUpdate());
		this.gameService.gameUpdate.subscribe({
			next: data => this.onGameUpdate(data)
		});
		this.gameService.newLover.subscribe({
			next: newLover => this.onNewLover(newLover)
		})
	}

	vote(pseudo: string) {
		if (!this.isCupidon) return;
		console.log('vote');
		this.gameService.cupidonVoteForPlayer(pseudo);
	}

	next() {
		console.log('next');
		this.gameService.nextState();
	}

	private onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isCupidon = this.gameService.isCurrentPlayerCupidon();
		this.players = data.players;
	}
	
	private onNewLover(newLover: string) {
		console.log('onNewLover', newLover);
		if (!this.lover1) this.lover1 = newLover;
		else if (!this.lover2) {
			this.lover2 = newLover;
			this.hasVoted = true;
		}
		console.log('onNewLover', this.lover1, this.lover2);
	}

}

export {CupidonVoteComponent};
