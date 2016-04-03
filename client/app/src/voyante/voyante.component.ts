import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';

@Component({
	selector: 'voyante',
	templateUrl: 'voyante/voyante.html'
})
class VoyanteComponent implements OnInit {

	isMJ: boolean;
	isVoyante: boolean;
	players: Player[];
	revealed: boolean;
	playersWithoutMe: Player[];

	constructor(private gameService: GameService) {
		console.log('VoyanteComponent instantiated');
	}

	ngOnInit() {
		this.onGameUpdate(this.gameService.getLastGameUpdate());
		this.gameService.gameUpdate.subscribe({
			next: data => this.onGameUpdate(data)
		});
	}

	reveal(pseudo: string) {
		if (!this.isVoyante) return;
		console.log('reveal', pseudo);
		this.gameService.voyanteRevealPlayer(pseudo);
	}

	next() {
		console.log('next');
		this.gameService.nextState();
	}

	private onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isVoyante = this.gameService.isCurrentPlayerVoyante();
		this.players = data.players;
		this.revealed = this.gameService.alreadyUseRevealThisTurn()
		this.playersWithoutMe = data.players.filter(p => p.pseudo !== data.me.pseudo);
	}

}

export {VoyanteComponent};
