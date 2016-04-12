/*ANGULAR*/
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

/*COMPONENTS*/
import {LoginComponent} from './login/login.component'
import {GameRouterComponent} from './game/game-router.component';

/*SERVICES*/
import {SocketService} from './components/socket/sockets-service';
import {GamesService} from './game/games-service';
import {SocketStatusComponent} from "./components/socket-status/socket-status.component";

@Component({
	selector: 'my-app',
	templateUrl: 'app.html',
	directives: [ROUTER_DIRECTIVES, SocketStatusComponent],
	providers: [
		ROUTER_PROVIDERS,
		SocketService,
		GamesService
	]
})
@RouteConfig([
	{ path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true },
	{ path: '/game/:roomCode/...', name: 'Game', component: GameRouterComponent }
])
export class AppComponent {
	constructor(private socketService: SocketService) {
		console.log('AppComponent instantiated');

		socketService
			.connect('/', {
				path: '/api/socket.io'
			})
			.on('connect_error', () => console.log('websocket error connected !'))
			.onConnect(() => console.log('websocket connected !'));

	}
}
/**
 * ng.probe(document.querySelector("body > my-app > div > game")).componentInstance.gameService.onGameUpdate
 *
 * ng.probe(document.querySelector("body > my-app > div > game")).injector._depProvider.componentView.changeDetector.detectChanges()
 *
 */