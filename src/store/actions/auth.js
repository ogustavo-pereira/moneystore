import * as types from './actionsTypes';

export const login = (userHash) => ({
	type: types.LOGIN_USER,
	payload: userHash,
});

export const loggout = () => ({
	type: types.LOGGOUT_USER,
	payload: null,
});
