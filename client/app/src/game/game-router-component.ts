import {Component, OnInit} from "angular2/core";
import {RouteParams, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

/*COMPONENTS*/
import {GameComponent} from './game.component';
import {WaitingRoomComponent} from '../waiting-room/waiting-room.component';

/*SERVICES*/
import {GamesService} from './game-service';

@Component({
	selector: 'game',
	template: `
<game [roomCode]="roomCode">Game</game>
<router-outlet></router-outlet>
`,
	directives: [ROUTER_DIRECTIVES, GameComponent, WaitingRoomComponent],
	providers: [GamesService]
})
@RouteConfig([
	{ path: '/waiting', name: 'WaitingRoom', component: WaitingRoomComponent, useAsDefault: true }
])
class GameRouterComponent implements OnInit {
	
	roomCode: string;

	constructor(params: RouteParams, private gameService: GamesService) {
		console.log('GameRouterComponent instantiated');
		this.roomCode = params.get('roomCode');
	}

	ngOnInit() {
		console.log('GameRouterComponent ngOnInit');
		this.gameService.initGame(this.roomCode);
	}

}

export {GameRouterComponent};
