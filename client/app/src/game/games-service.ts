import {Injectable} from 'angular2/core';
import {SocketService} from '../components/socket/sockets-service';

export interface ActionOnGameResult {
	roomCode: string
}

export interface JoinGameResult extends ActionOnGameResult { }
export interface CreateGameResult extends ActionOnGameResult { }

@Injectable()
export class GamesService {

	constructor(private socketService: SocketService) {
		console.log('GameService instantiated');
	}
	
	joinGame(code: string, pseudo: string): Promise<JoinGameResult> {
		return this.socketService.emitp("join_game", {code, pseudo})
			.then((data: any) => {
				console.log('game joined', data);
				return { roomCode: data.id };
			});
	}
	
	createGame(pseudo: string): Promise<CreateGameResult> {
		return this.socketService.emitp("create_game", {pseudo})
			.then((data: any) => {
				console.log('game created', data);
				return { roomCode: data.id };
			});
	}
	
}
