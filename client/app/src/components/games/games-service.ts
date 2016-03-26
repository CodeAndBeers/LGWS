import {Injectable} from 'angular2/core';
import {SocketService} from '../socket/sockets-service';

@Injectable()
export class GamesService {

	constructor(private socketService: SocketService) {
		console.log('GamesService instantiated');
	}
	
	joinGame(code: string, pseudo: string) {
		this.socketService.sendp("join_game", {code, pseudo})
			.then(() => console.log('game joined'));
	}
	
	createGame(code: string) {
		this.socketService.sendp("create_game", code)
			.then(() => console.log('game created'));
		
	}
	
}
