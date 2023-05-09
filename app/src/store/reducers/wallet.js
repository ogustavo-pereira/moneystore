import * as types from '../actions/actionsTypes';

const initProps = {
	money: 0,
	totalInvested: 0,
	operations: [],
	coins: [
		{ name: 'BitCoin', value: 0 },
		{ name: 'Brita', value: 0 },
	],
};

export default function wallet(state = initProps, action) {
	switch (action.type) {
		case types.INIT_WALLET:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
