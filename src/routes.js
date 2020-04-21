/**
 * @author oguhpereira
 * Routes
 */
import LoginArea from './views/LoginArea';
import Dashboard from './views/Dashboard';
import Trade from './views/Trade';

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
	{
		path: '/trade',
		name: 'dashboard',
		component: Trade,
		layout: '/user',
	},
];
