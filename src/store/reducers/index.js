import { combineReducers } from 'redux';

import auth from './auth';
import wallet from './wallet';

export default combineReducers({
	auth,
	wallet,
});
