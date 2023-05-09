import * as types from '../actions/actionsTypes';

const initProps = () => {
	const userHash = localStorage.getItem('auth');
	const dataUser = JSON.parse(localStorage.getItem('data') || '{}');
	if (userHash in dataUser) {
		return {
			userHash,
			isAuthenticated: true,
		};
	}
	return {
		userHash: null,
		isAuthenticated: false,
	};
};

export default function auth(state = initProps(), action) {
	switch (action.type) {
		case types.LOGIN_USER:
			return {
				...state,
				userHash: action.payload,
				isAuthenticated: true,
			};
		case types.LOGOUT_USER:
			return {
				...state,
				userHash: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
}
