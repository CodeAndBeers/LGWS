import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {LoginComponent} from './login/login.component'

@Component({
	selector: 'my-app',
	templateUrl: 'app.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS
	]
})
@RouteConfig([
	{ path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true }
])
export class AppComponent { }
