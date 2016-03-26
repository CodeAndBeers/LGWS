import {Injectable, Output, EventEmitter} from 'angular2/core';
import {SocketService} from '../components/socket/sockets-service';

export interface Player {
	pseudo: string,
	role: string,
	dead: string,
	vote: any
}

export interface GameState {
	name: string,
	actions: any[]
}

export interface GameUpdate {
	mj: any,
	id: string,
	turn: number,
	state: GameState,
	players: Player[]
}

@Injectable()
export class GamesService {

	private roomCode: string;

	@Output() gameUpdate: EventEmitter<GameUpdate> = new EventEmitter();
	private lastGameUpdate: GameUpdate;

	constructor(private socketService: SocketService) {
		console.log('GameService instantiated');
	}

	initGame(roomCode: string) {
		this.roomCode = roomCode;

		this.socketService.on('game_update', (data) => this.onGameUpdate(data));
	}
	
	getRoomCode() {
		return this.roomCode;
	}

	getPlayers(): Player[] {
		if (!this.lastGameUpdate) return [];
		
		return this.lastGameUpdate.players;
	}
	
	private onGameUpdate(data) {
		console.log('game_update', data);
		this.lastGameUpdate = data;
		this.gameUpdate.emit(data);
	}
}
