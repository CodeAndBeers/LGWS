import {Injectable, Output, EventEmitter} from 'angular2/core';
import {SocketService} from '../components/socket/sockets-service';
import {BehaviorSubject} from "rxjs/Rx";

export const Roles = {
	MJ: "MJ",
	VILLAGEOIS: "VILLAGEOIS",
	LOUP_GAROU: "LOUP_GAROU",
	HUNTER: "HUNTER",
	WITCH: "WITCH",
	CUPIDON: "CUPIDON",
	VOYANTE: "VOYANTE"
};

export const GameStates = {
	WAITING_PLAYERS: "WAITING_PLAYERS",
	DAY_VOTE: "DAY_VOTE",
	DAY_RESULT: "DAY_RESULT",
	DISTRIBUTE_ROLE: "DISTRIBUTE_ROLE",
	CUPIDON: "CUPIDON",
	VOYANTE: "VOYANTE",
	WITCH: "WITCH",
	LOUP_GAROU_VOTE: "LOUP_GAROU_VOTE",
	LOUP_GAROU_RESULT: "LOUP_GAROU_RESULT",
	HUNTER_REVENGE: "HUNTER_REVENGE"
};

export const DeathReasons = {
	NONE: "NONE",
	DAY_VOTE: "DAY_VOTE",
	LOUP_GAROU_VOTE: "LOUP_GAROU_VOTE",
	LOUP_GAROU_RESULT: "LOUP_GAROU_RESULT",
	DEATH_BY_WITCH: "DEATH_BY_WITCH",
	HUNTER_REVENGE: "HUNTER_REVENGE"
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
	last_dead?: boolean,
	revealed?: boolean
}

export interface GameState {
	name: string,
	actions: any[]
}

export interface GameUpdate {
	me: Player,
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

	private currentGameUpdate: GameUpdate;
	private currentGameState: string;

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

	distributeRole(distributionTable) {
		if (!this.isCurrentPlayerMJ()) return;
		this.socketService.emit("next", distributionTable);
	}

	getRoomCode() {
		return this.roomCode;
	}

	getPlayers(): Player[] {
		if (!this.currentGameUpdate) return [];

		return this.currentGameUpdate.players;
	}

	getLastGameUpdate() {
		return this.currentGameUpdate;
	}
	
	getCurrentPlayer(): BasePlayer {
		if (!this.currentGameUpdate) return null;
		return this.currentGameUpdate.me;
	}

	getCurrentPlayerPseudo(): string {
		return this.getCurrentPlayer().pseudo;
	}

	getCurrentPlayerRole(): string {
		const player:BasePlayer = this.getCurrentPlayer();
		if (!player) return null;
		return player.role;
	}

	isCurrentPlayer(role: string) {
		const player:BasePlayer = this.getCurrentPlayer();
		if (!player) return false;
		return player.role === role;
	}

	isCurrentPlayerLover():boolean {
		const player:Player = this.getCurrentPlayer();
		if (!player) return false;
		return player.lover;
	}

	isCurrentPlayerCupidon():boolean {
		return this.isCurrentPlayer(Roles.CUPIDON);
	}

	isCurrentPlayerVoyante():boolean {
		return this.isCurrentPlayer(Roles.VOYANTE);
	}

	isCurrentPlayerHunter():boolean {
		return this.isCurrentPlayer(Roles.HUNTER);
	}

	isCurrentPlayerWitch():boolean {
		return this.isCurrentPlayer(Roles.WITCH);
	}

	isCurrentPlayerMJ(): boolean {
		return this.isCurrentPlayer(Roles.MJ);
	}

	isCurrentPlayerDead(): boolean {
		const player = this.getCurrentPlayer();
		if (!player) return false;
		if (!player || player.role === Roles.MJ) return false;
		return (<Player>player).dead !== DeathReasons.NONE;
	}

	alreadyUseRevealThisTurn() {
		return this.currentGameUpdate && this.currentGameUpdate.revealed;
	}

	isCurrentPlayerLoupGarou(): boolean {
		return this.isCurrentPlayer(Roles.LOUP_GAROU);
	}

	getCurrentTurn(): number {
		if (!this.currentGameUpdate) return null;
		return this.currentGameUpdate.turn;
	}

	getCurrentStep(): string {
		if (!this.currentGameUpdate) return null;
		return this.currentGameUpdate.state.name;
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

	loupGarouVoteForPlayer(playerPseudo: string) {
		if (this.getCurrentStep() !== GameStates.LOUP_GAROU_VOTE) return;
		if (!this.isCurrentPlayerLoupGarou()) return;
		this.socketService.emit('loup_garou_vote', { player_pseudo: playerPseudo});
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

	hunterRevengePlayer(playerPseudo: string) {
		if (this.getCurrentStep() !== GameStates.HUNTER_REVENGE) return;
		if (!this.isCurrentPlayerHunter()) return;
		this.socketService.emit('revenge', { player_pseudo: playerPseudo});
	}

	public getAllPlayersSorted() : Player[] {
		if (!this.currentGameUpdate) return [];
		return this.currentGameUpdate.players
			.filter(player => player.pseudo !== this.getCurrentPlayerPseudo())
			.sort((p1, p2) => p1.dead === DeathReasons.NONE ? -1 : 1);
 	}

	private onGameUpdate(data: GameUpdate) {
		console.log('game_update', data);

		this.lastGameState = this.currentGameState;
		this.lastGameUpdate = this.currentGameUpdate;

		this.currentGameUpdate = data;
		this.currentGameState = data.state.name;

		this.gameUpdateSub.next(data);
		this.gameUpdate.emit(data);

		if (this.currentGameState !== this.lastGameState) {
			this.gameStateUpdate.emit(this.currentGameState);
		}

		if (this.currentGameUpdate && this.currentGameUpdate.players) {
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
	}
}
