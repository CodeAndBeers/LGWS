import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, Roles, DeathReasons} from "../game/game-service";
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'witch-vote',
	templateUrl: 'witch-vote/witch-vote.html'
})
class WitchVoteComponent extends GameAwareComponent implements OnInit {

	isMJ: boolean = false;
	isWitch: boolean = false;
	isWitchDead = false;
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

	canUseDeathPotion(player: Player): boolean {
		return this.me && this.me.death_potion > 0 && player.dead === DeathReasons.NONE;
	}

	canUseLifePotion(player: Player): boolean {
		return this.me && this.me.life_potion > 0 && player.dead === DeathReasons.LOUP_GAROU_VOTE && player.last_dead;
	}

	protected onGameUpdate(data: GameUpdate) {
		this.isMJ = this.gameService.isCurrentPlayerMJ();
		this.isWitch = this.gameService.isCurrentPlayer(Roles.WITCH);
		this.isWitchDead = this.isWitch && this.gameService.isCurrentPlayerDead();
		this.players = data.players;
		this.me = <Player>data.me;
	}

}

export {WitchVoteComponent};
