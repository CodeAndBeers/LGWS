import {Component} from 'angular2/core';
import {GamesService} from '../components/games/games-service';

interface JoinGameRequest {
	code?: string,
	pseudo?: string
}

interface CreateGameRequest {
	pseudo?: string
}

@Component({
	selector: 'login',
	templateUrl: 'login/login.html'
})
export class LoginComponent {
	
	create: CreateGameRequest;
	join: JoinGameRequest;
	
	constructor(private gamesService: GamesService) {
		console.log('LoginComponent instantiated');
		this.create = {};
	}

	joinGame(code: string, pseudo: string) {
		console.log('joinGame', pseudo);
		this.gamesService.joinGame(code, pseudo)
			.then(() => {
				console.log('game created!!');
			});
	}

	createGame(pseudo: string) {
		console.log('createGame', pseudo);
		this.gamesService.createGame(pseudo)
			.then(() => {
				console.log('game created!!');
			});
	}
}
