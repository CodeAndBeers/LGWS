import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'distribute-role',
	templateUrl: 'distribute-role/distribute-role.html'
})
class DistributeRoleComponent extends GameAwareComponent implements OnInit {

	players: Player[];
	roomCode: string;
	mj: MJ;
	isMJ: boolean;

	constructor(gameService: GameService) {
		super(gameService);
		console.log('DistributeRoleComponent instantiated');
	}

	ngOnInit() {
		super.ngOnInit();
		this.roomCode = this.gameService.getRoomCode();
	}

	next() {
		console.log('nextState');
		this.gameService.distributeRole();
	}

	onGameUpdate(data: GameUpdate) {
		console.log('DistributeRoleComponent.onGameUpdate', data);
		this.players = data.players;
		this.mj = data.mj;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {DistributeRoleComponent};
