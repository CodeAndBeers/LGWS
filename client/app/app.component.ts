import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {LoginComponent} from './login/login.component'
import {SocketService} from './components/socket/sockets-service';

@Component({
	selector: 'my-app',
	templateUrl: 'app.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS,
		SocketService
	]
})
@RouteConfig([
	{ path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true }
])
export class AppComponent { 
	constructor(private socketService: SocketService) {
		
	}
}
