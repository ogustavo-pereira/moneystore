import * as types from './actionsTypes';

export const login = (userHash) => ({
	type: types.LOGIN_USER,
	payload: userHash,
});

export const logout = () => ({
	type: types.LOGOUT_USER,
	payload: null,
});
