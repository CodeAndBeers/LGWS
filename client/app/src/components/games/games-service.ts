import {Injectable} from 'angular2/core';
import {SocketService} from '../socket/sockets-service';

@Injectable()
export class GamesService {

	constructor(private socketService: SocketService) {
		console.log('GamesService instantiated');
	}
	
	joinGame(code: string, pseudo: string) {
		return this.socketService.emitp("join_game", {code, pseudo})
			.then(() => console.log('game joined'));
	}
	
	createGame(pseudo: string) {
		return this.socketService.emitp("create_game", pseudo)
			.then(() => console.log('game created'));
	}
	
}
