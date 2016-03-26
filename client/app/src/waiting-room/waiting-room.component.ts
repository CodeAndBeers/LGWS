import {Component, OnInit} from "angular2/core";
import {GamesService, GameUpdate, Player} from '../game/game-service';

@Component({
	selector: 'waiting-room',
	templateUrl: 'waiting-room/waiting-room.html'
})
class WaitingRoomComponent implements OnInit {

	players: Player[];
	roomCode: string;
	
	constructor(private gameService: GamesService) {
		console.log('WaitingRoomComponent instantiated');
	}

	ngOnInit() {
		this.roomCode = this.gameService.getRoomCode();
		this.gameService.gameUpdate.subscribe({
			next: (data) => this.onGameUpdate(data)
		});
	}
	
	private onGameUpdate(data: GameUpdate) {
		this.players = data.players;
	}


}

export {WaitingRoomComponent};
