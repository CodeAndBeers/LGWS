import {Component} from "angular2/core";
import {SocketService} from "../socket/sockets-service";
@Component({
	selector: 'socket-status',
	templateUrl: 'components/socket-status/socket-status.html'
})
class SocketStatusComponent {

	status: string;
	
	constructor(private socketService: SocketService) {

		socketService.on("connect", () => this.onConnect());
		socketService.on("reconnect", () => this.onConnect());

		socketService.on("reconnect_attempt", () => this.onConnectionPending());
		socketService.on("reconnecting", () => this.onConnectionPending());

		socketService.on("connect_error", () => this.onError());
		socketService.on("connect_timeout", () => this.onError());
		socketService.on("reconnect_error", () => this.onError());
		socketService.on("reconnect_failed", () => this.onError());
	}

	onConnect() {
		this.status = "ok";
	}

	onError() {
		this.status = "error";
	}

	onConnectionPending() {
		this.status = "pending";
	}

}

export {SocketStatusComponent};
