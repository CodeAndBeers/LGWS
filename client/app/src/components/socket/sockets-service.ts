import io from 'socket.io-client';
import {Injectable} from 'angular2/core';

@Injectable()
export class SocketService {

	constructor() {
		console.log('SocketService was instantiated');
		console.log(location.origin + '/api');
		const socket = io(location.origin + '/api/', {
			path: '/api/socket.io'
		});

		socket.on('connect', () => {
			console.log("hola que tal");
		});

		socket.on('error', (e) => {
			console.log("error occured", e);
		});


	}
}