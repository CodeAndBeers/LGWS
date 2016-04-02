import {Component, OnInit} from "angular2/core";
import {RouteParams, RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

/*COMPONENTS*/
import {GameComponent} from './game.component';
import {WaitingRoomComponent} from '../waiting-room/waiting-room.component';
import {CaptainVoteComponent} from "../captain-vote/captain-vote.component";
import {CaptainResultComponent} from "../captain-result/captain-result.component";
import {LoupGarouVoteComponent} from "../loup-garou-vote/loup-garou-vote.component";
import {DistributeRoleComponent} from "../distribute-role/distribute-role.component";
import {CupidonVoteComponent} from "../cupidon-vote/cupidon-vote.component";
import {VoyanteComponent} from "../voyante/voyante.component";

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
	{ path: '/vote/captain', name: 'CaptainVote', component: CaptainVoteComponent },
	{ path: '/vote/loup-garou', name: 'LoupGarouVote', component: LoupGarouVoteComponent},
	{ path: '/roles', name: 'DistributeRole', component: DistributeRoleComponent },
	{ path: '/result/captain', name: 'CaptainResult', component: CaptainResultComponent },
	{ path: '/cupidon', name: 'CupidonVote', component: CupidonVoteComponent },
	{ path: '/voyante', name: 'Voyante', component: VoyanteComponent }
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
		var route;
		switch (newState) {
			case GameStates.WAITING_PLAYERS:
				route = ['./WaitingRoom'];
				break;
			case GameStates.DAY_VOTE:
				if (this.gameService.getCurrentTurn() === 0) {
					route = ['./CaptainVote'];
				}
			break;
			case GameStates.DAY_RESULT:
				if (this.gameService.getCurrentTurn() === 0) {
					route = ['./CaptainResult'];
				}
				break;
			case GameStates.DISTRIBUTE_ROLE:
				route = ['./DistributeRole'];
				break;
			case GameStates.CUPIDON:
				route = ['./CupidonVote'];
				break;
			case GameStates.LOUP_GAROU_VOTE:
				route = ['./LoupGarouVote'];
				break;
			case GameStates.VOYANTE:
					route = ['./Voyante'];
					break;
			default:
				console.warn(`No route found corresponding to state ${newState}`);
				console.warn(`[TMP] going to distribute role instead`);
				//tmp
				route = ['./DistributeRole'];
				break;
		}
		console.log("route to ", route);
		this.router.navigate(route);
	}

}

export {GameRouterComponent};
