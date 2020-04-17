/**
 * @author oguhpereira
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import './index.css';
import Login from './layout/Login';
import * as serviceWorker from './serviceWorker';

const hist = createBrowserHistory();

ReactDOM.render(
	<Router history={hist}>
		<Switch>
			<Route path="/" component={Login} />
			<Redirect from="/" to="/login" />
		</Switch>
	</Router>,
	document.getElementById('app')
);

serviceWorker.unregister();
