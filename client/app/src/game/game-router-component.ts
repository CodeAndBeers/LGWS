import {Component, OnInit} from "angular2/core";
import {RouteParams, RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

/*COMPONENTS*/
import {GameComponent} from './game.component';
import {WaitingRoomComponent} from '../waiting-room/waiting-room.component';
import {CaptainVoteComponent} from "../captain-vote/captain-vote.component";

/*SERVICES*/
import {GameService, GameStates} from './game-service';

@Component({
	selector: 'game',
	template: `
<game [roomCode]="roomCode">Game</game>
<router-outlet></router-outlet>
`,
	directives: [ROUTER_DIRECTIVES, GameComponent, WaitingRoomComponent],
	providers: [GameService]
})
@RouteConfig([
	{ path: '/waiting', name: 'WaitingRoom', component: WaitingRoomComponent, useAsDefault: true },
	{ path: '/vote/captain', name: 'CaptainVote', component: CaptainVoteComponent }
])
class GameRouterComponent implements OnInit {
	
	roomCode: string;

	constructor(params: RouteParams, private gameService: GameService, private router: Router) {
		console.log('GameRouterComponent instantiated');
		this.roomCode = params.get('roomCode');
	}

	ngOnInit() {
		console.log('GameRouterComponent ngOnInit');
		this.gameService.initGame(this.roomCode);

		this.gameService.gameStateUpdate.subscribe({
			next: newState => this.onGameStateUpdate(newState)
		});
	}

	private onGameStateUpdate(newState: string) {
		console.log('onGameStateUpdate', newState);
		switch (newState) {
			case GameStates.WAITING_PLAYERS:
				this.router.navigate(['./WaitingRoom']);
				break;
			case GameStates.DAY_VOTE:
				if (this.gameService.getCurrentTurn() === 0) {
					this.router.navigate(['./CaptainVote']);
				}
				break;
		}
	}

}

export {GameRouterComponent};
