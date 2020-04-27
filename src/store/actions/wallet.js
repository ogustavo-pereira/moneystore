import * as types from './actionsTypes';

export const initWallet = (wallet) => ({
	type: types.INIT_WALLET,
	payload: wallet,
});
