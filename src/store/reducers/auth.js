import * as types from '../actions/actionsTypes';

const initProps = {
	userHash: null,
	isAuthenticated: false,
};

export default function auth(state = initProps, action) {
	switch (action.type) {
		case types.LOGIN_USER:
			return {
				...state,
				userHash: action.payload,
				isAuthenticated: true,
			};
		case types.LOGGOUT_USER:
			return {
				...state,
				userHash: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
}
