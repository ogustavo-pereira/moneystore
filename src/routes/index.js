import Dashboard from '../components/Dashboard';
import Trade from '../components/Trade';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export const PrivateRoutes = [
	{
		path: '/dashboard',
		component: Dashboard,
	},
	{
		path: '/trade',
		component: Trade,
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
