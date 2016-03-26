import {Component, OnInit} from "angular2/core";
import {GameService, GameUpdate, Player, MJ} from '../game/game-service';

@Component({
	selector: 'waiting-room',
	templateUrl: 'waiting-room/waiting-room.html'
})
class WaitingRoomComponent implements OnInit {

	players: Player[];
	roomCode: string;
	mj: MJ;
	isMJ: boolean;
	
	constructor(private gameService: GameService) {
		console.log('WaitingRoomComponent instantiated');
	}

	ngOnInit() {
		this.roomCode = this.gameService.getRoomCode();
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
	}

	startGame() {
		console.log('startGame');
		this.gameService.nextState();
	}
	
	private onGameUpdate(data: GameUpdate) {
		this.players = data.players;
		this.mj = data.mj;
		this.isMJ = this.gameService.isCurrentPlayerMJ();
	}


}

export {WaitingRoomComponent};
