import {Component} from 'angular2/core';
import {GamesService} from '../components/games/games-service';

@Component({
	selector: 'login',
	templateUrl: 'login/login.html'
})
export class LoginComponent {
	
	constructor(gamesService: GamesService) {
		console.log('LoginComponent instantiated');
	}

	joinGame(code: string, pseudo: string) {
		
	}
}
