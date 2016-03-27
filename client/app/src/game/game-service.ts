import {Injectable, Output, EventEmitter} from 'angular2/core';
import {SocketService} from '../components/socket/sockets-service';

export const Roles = {
	MJ: "MJ"
};

export const GameStates = {
	WAITING_PLAYERS: "WAITING_PLAYERS",
	DAY_VOTE: "DAY_VOTE",
	DAY_RESULT: "DAY_RESULT"
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

	@Output() gameUpdate: EventEmitter<GameUpdate> = new EventEmitter();
	@Output() gameStateUpdate: EventEmitter<String> = new EventEmitter();

	private roomCode: string;
	private lastGameUpdate: GameUpdate;
	private lastGameState: string;

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
	
	getLastGameUpdate() {
		return this.lastGameUpdate;
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

	getCurrentTurn(): number {
		if (!this.lastGameUpdate) return null;
		return this.lastGameUpdate.turn;
	}

	getCurrentStep(): string {
		if (!this.lastGameUpdate) return null;
		return this.lastGameUpdate.state.name;
	}
	
	voteForPlayer(playerName: string) {
		if (this.getCurrentStep() !== GameStates.DAY_VOTE) return;
		this.socketService.emit('vote', { player_name: playerName});
	}

	private onGameUpdate(data: GameUpdate) {
		console.log('game_update', data);
		this.lastGameUpdate = data;
		this.gameUpdate.emit(data);

		if (data.state.name !== this.lastGameState) {
			this.lastGameState = data.state.name;
			this.gameStateUpdate.emit(this.lastGameState);			
		}
	}
}
