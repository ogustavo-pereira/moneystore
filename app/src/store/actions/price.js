import * as types from './actionsTypes';

export const setBitcoin = (price) => ({
	type: types.SET_BITCOIN,
	payload: price,
});

export const setBrita = (price) => ({
	type: types.SET_BRITA,
	payload: price,
});
