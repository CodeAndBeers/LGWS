import {Injectable, Output, EventEmitter} from 'angular2/core';
import {SocketService} from '../components/socket/sockets-service';

export const Roles = {
	MJ: "MJ",
	VILLAGEOIS: "VILLAGEOIS",
	LOUP_GAROU: "LOUP_GAROU",
	WITCH: "WITCH",
	VOYANTE: "VOYANTE",
	CUPIDON: "CUPIDON",
	HUNTER: "HUNTER"
};

export const GameStates = {
	WAITING_PLAYERS: "WAITING_PLAYERS",
	DAY_VOTE: "DAY_VOTE",
	DAY_RESULT: "DAY_RESULT",
	DISTRIBUTE_ROLE: "DISTRIBUTE_ROLE",
	CUPIDON: "CUPIDON"
};

export interface BasePlayer {
	pseudo:string,
	role: string
}

export interface MJ extends BasePlayer { }

export interface Player extends BasePlayer {
	dead: string,
	vote: any,
	vote_count: number
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
	
	isCurrentPlayer(role: string) {
		const player:BasePlayer = this.getCurrentPlayer();
		if (!player) return false;
		return player.role === role;
	}

	isCurrentPlayerCupidon():boolean {
		return this.isCurrentPlayer(Roles.CUPIDON);
	}

	isCurrentPlayerMJ(): boolean {
		return this.isCurrentPlayer(Roles.MJ);
	}

	getCurrentTurn(): number {
		if (!this.lastGameUpdate) return null;
		return this.lastGameUpdate.turn;
	}

	getCurrentStep(): string {
		if (!this.lastGameUpdate) return null;
		return this.lastGameUpdate.state.name;
	}

	voteForPlayer(playerPseudo: string) {
		if (this.getCurrentStep() !== GameStates.DAY_VOTE) return;
		this.socketService.emit('vote', { player_pseudo: playerPseudo});
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
