import LoginArea from './views/LoginArea';

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
];
