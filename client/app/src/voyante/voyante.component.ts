import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'voyante',
	templateUrl: 'voyante/voyante.html'
})
class VoyanteComponent extends GameAwareComponent implements OnInit {

	isMJ: boolean;
	isVoyante: boolean;
	players: Player[];
	revealed: boolean;
	isVoyanteDead: boolean;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('VoyanteComponent instantiated');
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

	onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isVoyante = this.gameService.isCurrentPlayerVoyante();
		this.isVoyanteDead = this.isVoyante && this.gameService.isCurrentPlayerDead();
		this.players = data.players;
		this.revealed = this.gameService.alreadyUseRevealThisTurn()
	}

}

export {VoyanteComponent};
