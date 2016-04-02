import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, Roles} from "../game/game-service";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'witch-vote',
	templateUrl: 'witch-vote/witch-vote.html'
})
class WitchVoteComponent extends GameAwareComponent implements OnInit {

	isMJ: boolean = false;
	isWitch: boolean = false;
	players: Player[];
	me: Player;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('WitchVoteComponent instantiated');
	}
	
	next() {
		console.log('next');
		this.gameService.nextState();
	}
	
	useDeathPotion(player: string) {
		console.log('useDeathPotion', player);
		this.gameService.useDeathPotion(player);
	}

	useLifePotion(player: string) {
		console.log('useLifePotion', player);
		this.gameService.useLifePotion(player);
	}

	canUseDeathPotion(): boolean {
		return this.me && this.me.death_potion > 0;
	}

	canUseLifePotion(): boolean {
		return this.me && this.me.life_potion > 0;
	}
	protected onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isWitch = this.gameService.isCurrentPlayer(Roles.WITCH);
		this.players = data.players;
		this.me = <Player>data.me;
	}

}

export {WitchVoteComponent};
