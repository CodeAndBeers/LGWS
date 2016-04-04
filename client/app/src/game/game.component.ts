import {Component, Input, OnInit} from "angular2/core";
import {GameService, GameUpdate} from "./game-service";

@Component({
	selector: 'game',
	template: `
<button (click)="displayDebug = !displayDebug"></button>
<div *ngIf="displayDebug" class="well">{{gameUpdate | json}}</div>
`
})
class GameComponent implements OnInit {

	@Input() roomCode: string;

	gameUpdate: GameUpdate;
	displayDebug= false;

	constructor(private gameService: GameService) {
		console.log('GameComponent');
	}

	ngOnInit() {
		console.log('GameComponent ngOnInit', this, this.roomCode);
		this.gameUpdate = this.gameService.getLastGameUpdate();
		this.gameService.gameUpdate.subscribe({
			next: (gameUpdate) => this.gameUpdate = gameUpdate
		});
	}


}

export {GameComponent};
