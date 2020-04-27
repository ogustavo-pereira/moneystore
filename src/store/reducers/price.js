import * as types from '../actions/actionsTypes';

const initProps = {
	bitcoin: null,
	brita: null,
};

export default function auth(state = initProps, action) {
	switch (action.type) {
		case types.SET_BITCOIN:
			return {
				...state,
				bitcoin: action.payload,
			};
		case types.SET_BRITA:
			return {
				...state,
				brita: action.payload,
			};
		default:
			return state;
	}
}
