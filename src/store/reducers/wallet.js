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
			const userAuth = localStorage.getItem('auth');
			const dataUser = JSON.parse(localStorage.getItem('data') || '{}');
			const wallet = JSON.parse(atob(dataUser[userAuth]));
			return {
				...state,
				...wallet,
			};
		default:
			return state;
	}
}
