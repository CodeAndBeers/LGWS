import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {GamesService} from '../game/games-service';

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
	
	constructor(private gamesService: GamesService, private router: Router) {
		console.log('LoginComponent instantiated');
			
		this.create = {};
		this.join = {};
	}

	joinGame(joinRequest: JoinGameRequest) {
		console.log('joinGame', joinRequest);
		this.gamesService.joinGame(joinRequest.code, joinRequest.pseudo)
			.then((result) => {
				console.log('game joined!!', 'code is ', result.roomCode);
				this.router.navigate(['Game', { roomCode: result.roomCode }]);
			});
	}

	createGame(createRequest: CreateGameRequest) {
		console.log('createGame', createRequest);
		this.gamesService.createGame(createRequest.pseudo)
			.then((result) => {
				console.log('game created!!', 'code is ', result.roomCode);
				this.router.navigate(['Game', { roomCode: result.roomCode }]);
			});
	}
}
