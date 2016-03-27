import {Injectable, Output, EventEmitter} from 'angular2/core';
import {SocketService} from '../components/socket/sockets-service';

export const Roles = {
	MJ: "MJ"
};

export interface BasePlayer {
	pseudo:string,
	role: string
}

export interface MJ extends BasePlayer { }

export interface Player extends BasePlayer {
	dead: string,
	vote: any
}

export interface GameState {
	name: string,
	actions: any[]
}

export interface GameUpdate {
	me: BasePlayer,
	mj: MJ,
	id: string,
	turn: number,
	state: GameState,
	players: Player[]
}

@Injectable()
export class GameService {

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
	
	nextState() {
		if (!this.isCurrentPlayerMJ()) return;
		
		this.socketService.emit("next");
	}
	
	getRoomCode() {
		return this.roomCode;
	}

	getPlayers(): Player[] {
		if (!this.lastGameUpdate) return [];
		
		return this.lastGameUpdate.players;
	}

	getCurrentPlayer(): BasePlayer {
		if (!this.lastGameUpdate) return null;
		return this.lastGameUpdate.me;
	}
	
	isCurrentPlayerMJ(): boolean {
		const player:BasePlayer = this.getCurrentPlayer();
		if (!player) return false;
		return player.role === Roles.MJ;
	}
	
	private onGameUpdate(data) {
		console.log('game_update', data);
		this.lastGameUpdate = data;
		this.gameUpdate.emit(data);
	}
}
