import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';
import {GameAwareComponent} from "../game/game-aware.component";

class RoleDistributionTable {
	VILLAGEOIS : number = 0;
	LOUP_GAROU : number = 0;
	WITCH : number = 0;
	CUPIDON : number = 0;
	HUNTER : number = 0;
	VOYANTE : number = 0;
}

@Component({
	selector: 'distribute-role',
	templateUrl: 'distribute-role/distribute-role.html'
})
class DistributeRoleComponent extends GameAwareComponent implements OnInit {

	players: Player[];
	roomCode: string;
	mj: MJ;
	isMJ: boolean;
	defaultDT = new RoleDistributionTable();
	editedDT = new RoleDistributionTable();

	constructor(gameService: GameService) {
		super(gameService);
		console.log('DistributeRoleComponent instantiated');
	}

	ngOnInit() {
		super.ngOnInit();
		this.roomCode = this.gameService.getRoomCode();
		this.buildDefaultDT();
	}

	buildDefaultDT() {
		let nb_players = this.players.length;
		for (let i = 0; i < nb_players; i++){
			switch(i % 3) {
				case 0: this.defaultDT[this.getSpecialRole(i)]++; break;
				case 1: this.defaultDT.LOUP_GAROU++; break;
				case 2: this.defaultDT.VILLAGEOIS++;  break;
			}
		}
	}

	specialRolePriority = ["VOYANTE", "WITCH", "CUPIDON", "HUNTER"];
	getSpecialRole(i) : string {
		let special_role = this.specialRolePriority[i / 3];
		if (!special_role) {
			special_role = "VILLAGEOIS";
		}
		return special_role;
	}

	next() {
		console.log('nextState');
		this.gameService.distributeRole(this.defaultDT);
	}

	onGameUpdate(data: GameUpdate) {
		console.log('DistributeRoleComponent.onGameUpdate', data);
		this.players = data.players;
		this.mj = data.mj;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {DistributeRoleComponent};
