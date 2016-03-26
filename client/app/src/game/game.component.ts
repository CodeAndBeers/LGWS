import {Component, Input, OnInit} from "angular2/core";

@Component({
	selector: 'game',
	template: '<div>Game</div>'
})
class GameComponent implements OnInit {
	
	@Input() roomCode: string;
	
	constructor() {
		console.log('GameComponent');
	}

	ngOnInit() {
		console.log('GameComponent ngOnInit', this, this.roomCode);
	}


}

export {GameComponent};
