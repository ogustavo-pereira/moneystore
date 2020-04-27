import { combineReducers } from 'redux';

import auth from './auth';
import wallet from './wallet';
import price from './price';

export default combineReducers({
	auth,
	wallet,
	price,
});
