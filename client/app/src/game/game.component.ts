import {Component, Input, OnInit} from "angular2/core";
import {GameService, GameUpdate} from "./game-service";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'game',
	templateUrl: 'game/game.html'
})
class GameComponent extends GameAwareComponent implements OnInit {

	@Input() roomCode: string;

	currentPlayerRole: string;
	displayDebug= false;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('GameComponent');
	}

	onGameUpdate(data: GameUpdate) {
		this.currentPlayerRole = this.gameService.getCurrentPlayerRole();
	}
}

export {GameComponent};
