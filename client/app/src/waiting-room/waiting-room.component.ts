import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';
import {GameAwareComponent} from "../game/game-aware.component";

@Component({
	selector: 'waiting-room',
	templateUrl: 'waiting-room/waiting-room.html'
})
class WaitingRoomComponent extends GameAwareComponent implements OnInit {

	players: Player[];
	roomCode: string;
	mj: MJ;
	isMJ: boolean;
	
	constructor(gameService: GameService) {
		super(gameService);
		console.log('WaitingRoomComponent instantiated');
	}
	
	ngOnInit() {
		super.ngOnInit();
		this.roomCode = this.gameService.getRoomCode();
	}

	startGame() {
		console.log('startGame');
		this.gameService.nextState();
	}
	
	 protected onGameUpdate(data: GameUpdate) {
		if (!data) return;
		this.players = data.players;
		this.mj = data.mj;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}
	
}

export {WaitingRoomComponent};
