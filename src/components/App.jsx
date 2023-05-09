/**
 * @author oguhpereira
 */

import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import Application from './Application';

export default function App() {
	return (
		<Provider store={store}>
			<Application />
		</Provider>
	);
}
