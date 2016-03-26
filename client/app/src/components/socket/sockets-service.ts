import io from 'socket.io-client';
import {Injectable} from 'angular2/core';

@Injectable()
export class SocketService {

	private socket: SocketIOClient.Socket;

	constructor() {
		console.log('SocketService was instantiated');

		// this.socket = io(location.origin + '/api/', {
		// 	path: '/api/socket.io'
		// });
		//
		// this.socket.on('connect', (e) => {
		// 	console.log("hola que tal", e);
		// });

		//
		// this.socket.on('error', (e) => {
		// 	console.log("error occured", e);
		// });
		//

		// this.socket.on('news', (e) => {
		// 	console.log("news event occured", e);
		// });
		//
		// this.socket.emit("my other event", { hello : "world" }, function (data) {
		// 	console.log(data);
		// });
	}

	connect(url: string, opts?: SocketIOClient.ConnectOpts, fn?: Function) {
		this.socket = io(url, opts);
		if (fn) this.onConnect(fn);
		return this;
	}

	on(event: string, fn: Function) {
		this.socket.on(event, fn);
		return this;
	}

	onConnect(fn: Function) {
		return this.on('connect', fn);
	}

	onConnectTimeout(fn: Function) {
		return this.on('connect_timeout', fn);
	}

	onReconnect(fn: Function) {
		return this.on('reconnect', fn);
	}

	emit(event: string, ...args: any[]) {
		this.socket.emit(event, ...args);
		return this;
	}

	emitp(event: string, arg: any) {
		return new Promise((resolve, reject) => {
			this.socket.emit(event, arg, resolve);
		});
	}

	send(event: string, ...args: any[]) {
		this.socket.send(event, ...args);
		return this;
	}

	sendp(event: string, arg: any) {
		return new Promise((resolve, reject) => {
			this.socket.send(event, arg, resolve);
		});
	}


}