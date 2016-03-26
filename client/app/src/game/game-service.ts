import {Injectable, Output, EventEmitter} from 'angular2/core';
import {SocketService} from '../components/socket/sockets-service';

export interface GameState {
	name: string,
	actions: any[]
}

export interface GameUpdate {
	mj: any,
	id: string,
	turn: number,
	state: GameState,
	players: any[]
}

@Injectable()
export class GamesService {

	private roomCode: string;

	@Output() gameUpdate: EventEmitter<GameUpdate> = new EventEmitter();

	constructor(private socketService: SocketService) {
		console.log('GameService instantiated');
	}

	initGame(roomCode: string) {
		this.roomCode = roomCode;

		this.socketService.on('game_update', (data) => this.onGameUpdate(data));
	}
	
	private onGameUpdate(data) {
		console.log('game_update', data);
		this.gameUpdate.emit(null);
	}
}
