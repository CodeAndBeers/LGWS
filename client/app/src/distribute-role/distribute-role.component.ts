import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';

@Component({
	selector: 'distribute-role',
	templateUrl: 'distribute-role/distribute-role.html'
})
class DistributeRoleComponent implements OnInit {

	players: Player[];
	roomCode: string;
	mj: MJ;
	isMJ: boolean;

	constructor(private gameService: GameService) {
		console.log('DistributeRoleComponent instantiated');
	}

	ngOnInit() {
		this.roomCode = this.gameService.getRoomCode();
		this.onGameUpdate(this.gameService.getLastGameUpdate());
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
	}

	next() {
		console.log('nextState');
		this.gameService.distributeRole();
	}

	private onGameUpdate(data: GameUpdate) {
		this.players = data.players;
		this.mj = data.mj;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}

}

export {DistributeRoleComponent};
