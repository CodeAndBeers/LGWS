import {Injectable, Output, EventEmitter} from 'angular2/core';
import {SocketService} from '../components/socket/sockets-service';
import {BehaviorSubject} from "rxjs/Rx";

export const Roles = {
	MJ: "MJ",
	VILLAGEOIS: "VILLAGEOIS",
	LOUP_GAROU: "LOUP_GAROU",
	WITCH: "WITCH",
	CUPIDON: "CUPIDON",
	HUNTER: "HUNTER",
	VOYANTE: "VOYANTE",
};

export const GameStates = {
	WAITING_PLAYERS: "WAITING_PLAYERS",
	DAY_VOTE: "DAY_VOTE",
	DAY_RESULT: "DAY_RESULT",
	DISTRIBUTE_ROLE: "DISTRIBUTE_ROLE",
	CUPIDON: "CUPIDON",
	VOYANTE: "VOYANTE",
	WITCH: "WITCH"
};

export const DeathReasons = {
	NONE: "NONE",
	LOUP_GAROU_VOTE: "LOUP_GAROU_VOTE"
};

export interface BasePlayer {
	pseudo:string,
	role: string
}

export interface MJ extends BasePlayer { }

export interface Player extends BasePlayer {
	dead?: string,
	vote?: any,
	vote_count?: number,
	lover?: boolean,
	death_potion?: number,
	life_potion?: number,
	last_dead?: boolean
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
	revealed?: boolean,
	players: Player[]
}

@Injectable()
export class GameService {

	@Output() gameUpdate: EventEmitter<GameUpdate> = new EventEmitter();
	@Output() gameStateUpdate: EventEmitter<String> = new EventEmitter();
	@Output() newLover: EventEmitter<String> = new EventEmitter();

	gameUpdateSub: BehaviorSubject<GameUpdate> = new BehaviorSubject(null);

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

	distributeRole() {
		if (!this.isCurrentPlayerMJ()) return;

		const distributionTable = {};
		const playersCount = this.lastGameUpdate.players.length;
		let rolesCount = 0;
		//dummy role distribution generation; enough for now
		Object.keys(Roles).reverse().forEach((role) => {
			if (role === Roles.MJ) return;
			if (rolesCount >= playersCount) return;

			distributionTable[role] = 1;
			rolesCount++;
		});

		this.socketService.emit("next", distributionTable);
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

	isCurrentPlayerVoyante():boolean {
		return this.isCurrentPlayer(Roles.VOYANTE);
	}

	isCurrentPlayerWitch():boolean {
		return this.isCurrentPlayer(Roles.WITCH);
	}

	isCurrentPlayerMJ(): boolean {
		return this.isCurrentPlayer(Roles.MJ);
	}

	alreadyUseRevealThisTurn()  {
		return this.lastGameUpdate.revealed;
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

	cupidonVoteForPlayer(playerPseudo: string) {
		if (this.getCurrentStep() !== GameStates.CUPIDON) return;
		if (!this.isCurrentPlayerCupidon()) return;
		this.socketService.emit('vote_cupidon', { player_pseudo: playerPseudo});
	}

	voyanteRevealPlayer(playerPseudo: string) {
		if (this.getCurrentStep() !== GameStates.VOYANTE) return;
		if (!this.isCurrentPlayerVoyante()) return;
		this.socketService.emit('reveal', {player_pseudo: playerPseudo});
	}
	
	useDeathPotion(playerPseudo: string) {
		if (this.getCurrentStep() !== GameStates.WITCH) return;
		if (!this.isCurrentPlayerWitch()) return;

		this.socketService.emit('use_death_potion', { player_pseudo: playerPseudo});
	}

	useLifePotion(playerPseudo: string) {
		if (this.getCurrentStep() !== GameStates.WITCH) return;
		if (!this.isCurrentPlayerWitch()) return;

		this.socketService.emit('use_life_potion', { player_pseudo: playerPseudo});
	}

	private onGameUpdate(data: GameUpdate) {

		this.gameUpdateSub.next(data);
		console.log('game_update', data);
		this.gameUpdate.emit(data);

		if (data.state.name !== this.lastGameState) {
			this.gameStateUpdate.emit(data.state.name);
			this.lastGameState = data.state.name;
		}

		if (this.lastGameUpdate && this.lastGameUpdate.players) {
			data.players.forEach((player: Player) => {
				const oldPlayer = this.lastGameUpdate.players.find(oldPlayer => oldPlayer.pseudo === player.pseudo);
				if (!oldPlayer) return;
				if (!oldPlayer.lover && player.lover) {
					this.newLover.emit(player.pseudo);
				}
				if (!oldPlayer.dead && player.dead) {
					player.last_dead = true;
				}
			});
		}
		this.lastGameUpdate = data;
	}
}
