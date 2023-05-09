import Dashboard from '../components/Dashboard';
import Trade from '../components/Trade';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Extract from '../components/Extract';

export const PrivateRoutes = [
	{
		path: '/dashboard',
		component: Dashboard,
	},
	{
		path: '/trade',
		component: Trade,
	},
	{
		path: '/extract',
		component: Extract,
	},
];

export const PublicRoutes = [
	{
		path: '/login',
		component: LoginForm,
	},
	{
		path: '/register',
		component: RegisterForm,
	},
];
