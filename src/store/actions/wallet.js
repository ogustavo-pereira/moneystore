import * as types from './actionsTypes';

export const setWallet = (wallet) => ({
	type: types.INIT_WALLET,
	payload: wallet,
});
