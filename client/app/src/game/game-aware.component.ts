import {GameService, GameUpdate, Player, DeathReasons} from "./game-service";
import {OnInit} from "angular2/core";


abstract class GameAwareComponent implements OnInit {

	gameUpdate: GameUpdate;

	constructor(protected gameService: GameService) {}

	ngOnInit() {
		this.gameService.gameUpdateSub.subscribe(data => this._onGameUpdate(data));
	}

	isPlayerDead(player: Player): boolean {
		return player && player.dead !== DeathReasons.NONE;
	}

	private _onGameUpdate(data: GameUpdate) {
		this.gameUpdate = data;
		this.onGameUpdate(data);
	}

	protected abstract onGameUpdate(data: GameUpdate);
}

export {GameAwareComponent};
