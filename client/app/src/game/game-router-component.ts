import {Component} from "angular2/core";
import {RouteParams} from 'angular2/router';
import {GameComponent} from './game.component';

@Component({
	selector: 'game',
	template: '<game [roomCode]="roomCode">Game</game>',
	directives: [GameComponent]
})
class GameRouterComponent {
	
	roomCode: string;

	constructor(params: RouteParams) {
		console.log('GameRouterComponent instantiated');
		this.roomCode = params.get('roomCode');
	}

}

export {GameRouterComponent};
