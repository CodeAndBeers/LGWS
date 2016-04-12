import {GameService, GameUpdate, Player, DeathReasons} from "./game-service";
import {OnInit} from "angular2/core";


abstract class GameAwareComponent implements OnInit {
	
	constructor(protected gameService: GameService) {}

	ngOnInit() {
		this.gameService.gameUpdateSub.subscribe(data => this.onGameUpdate(data));
	}
	
	isPlayerDead(player: Player): boolean {
		return player && player.dead !== DeathReasons.NONE;
	}

	protected abstract onGameUpdate(data: GameUpdate);
}

export {GameAwareComponent};
