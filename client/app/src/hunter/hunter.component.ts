import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ, DeathReasons} from '../game/game-service';

@Component({
	selector: 'hunter',
	templateUrl: 'hunter/hunter.html'
})
class HunterComponent implements OnInit {

	isMJ: boolean;
	isHunter: boolean;
	players: Player[];
	playersWithoutMe: Player[];
	me : Player;

	constructor(private gameService: GameService) {
		console.log('HunterComponent instantiated');
	}

	ngOnInit() {
		this.onGameUpdate(this.gameService.getLastGameUpdate());
		this.gameService.gameUpdate.subscribe({
			next: data => this.onGameUpdate(data)
		});
	}

	revenge(pseudo: string) {
		if (!this.isHunter) return;
		console.log('revenge', pseudo);
		this.gameService.hunterRevengePlayer(pseudo);
	}

	next() {
		console.log('next');
		this.gameService.nextState();
	}

	private onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isHunter = this.gameService.isCurrentPlayerHunter();
		this.players = data.players;
		this.playersWithoutMe = GameService.getAllAlivePlayersButMe(data);
		this.me = data.me;
	}

}

export {HunterComponent};
