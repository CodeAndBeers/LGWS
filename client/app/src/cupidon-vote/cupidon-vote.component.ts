import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player} from "../game/game-service";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'cupidon-vote',
	templateUrl: 'cupidon-vote/cupidon-vote.html'
})
class CupidonVoteComponent extends GameAwareComponent implements OnInit {

	isMJ: boolean;
	isCupidon: boolean;
	players: Player[];
	hasVoted: boolean = false;
	lover1: string;
	lover2: string;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('CupidonVoteComponent instantiated');
	}

	ngOnInit() {
		super.ngOnInit();
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

	onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isCupidon = this.gameService.isCurrentPlayerCupidon();
		this.players = this.gameService.getAllPlayersSorted();
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
