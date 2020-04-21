/**
 * @author oguhpereira
 * Routes
 */
import LoginArea from './views/LoginArea';
import Dashboard from './views/Dashboard';

export default [
	{
		path: '/',
		name: 'login',
		component: LoginArea,
		layout: '/login',
	},
	{
		path: '/',
		name: 'register-user',
		component: LoginArea,
		layout: '/register',
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard,
		layout: '/user',
	},
];
