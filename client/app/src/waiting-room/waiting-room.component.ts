import {Component} from "angular2/core";
import {GamesService} from '../game/game-service';

@Component({
	selector: 'waiting-room',
	templateUrl: 'waiting-room/waiting-room.html'
})
class WaitingRoomComponent {
	
	constructor(private gameService: GamesService) {
		console.log('WaitingRoomComponent instantiated');
		
		this.gameService.gameUpdate.subscribe({
			next: function () {
				console.log('next');
			}
		});
	}
	
}

export {WaitingRoomComponent};
