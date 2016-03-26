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
		this.join = {};
	}

	joinGame(joinRequest: JoinGameRequest) {
		console.log('joinGame', joinRequest);
		this.gamesService.joinGame(joinRequest.code, joinRequest.pseudo)
			.then(() => {
				console.log('game joined!!');
			});
	}

	createGame(createRequest: CreateGameRequest) {
		console.log('createGame', createRequest);
		this.gamesService.createGame(createRequest.pseudo)
			.then(() => {
				console.log('game created!!');
			});
	}
}
