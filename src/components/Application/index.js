/**
 * @author oguhpereira
 * Aplication
 */
import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';

import LeftBar from '../LeftBar';
import RightBar from '../RightBar';
import { PrivateRoutes, PublicRoutes } from '../../routes';
import { initWallet as initWalletAction } from '../../store/actions/wallet';
import * as ApplicationAPI from './AplicationAPI';
import { setBitcoin, setBrita } from '../../store/actions/price';

const hist = createBrowserHistory();

/**
 * @function Container
 * @param {JSX} children
 * @param {Boolean} isPublic
 * @returns {JSX}
 */
function Container({ children, isPublic }) {
	return isPublic ? (
		<div className="container-center">
			<div className="box wrap-box-center">{children}</div>
		</div>
	) : (
		<div className="app-container">
			<div className="left-content">
				<LeftBar />
			</div>
			<div className="main-content">{children}</div>
			<div className="right-content">
				<RightBar />
			</div>
		</div>
	);
}

/**
 * @function PrivateRoute
 * @param {Object} props from application
 * @returns {JSX}
 */
function PrivateRoute(props) {
	const { auth } = props;
	return (
		<Route
			{...props.rest}
			render={({ location }) =>
				auth.isAuthenticated ? (
					<Container>
						<props.component />
					</Container>
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}

/**
 * @function Application
 * @param {Object} auth
 * @param {Function} initWallet
 * @param {Function} setBitcoin
 * @param {Function} setBrita
 * @returns {JSX}
 */
function Application({ auth, initWallet, setBitcoin, setBrita }) {
	useEffect(() => {
		async function watchBitcoin() {
			setBitcoin(await ApplicationAPI.getBitCoinPrice());
		}
		async function watchBrita() {
			setBrita(await ApplicationAPI.getBritaPrice(new Date()));
		}
		async function getWallet() {
			initWallet(ApplicationAPI.getWallet());
		}
		if (auth.isAuthenticated) {
			getWallet();
			setInterval(watchBitcoin(), 30000);
			setInterval(watchBrita(), 3600000);
		}
	});

	return (
		<Router history={hist}>
			<Switch>
				{PublicRoutes.map((props, index) => (
					<Route key={index} {...props}>
						{auth.isAuthenticated ? (
							<Redirect to="/dashboard" />
						) : (
							<Container isPublic>
								<props.component />
							</Container>
						)}
					</Route>
				))}
				{PrivateRoutes.map((props, index) => (
					<PrivateRoute key={index} {...props} auth={auth} />
				))}
				<Route>
					{auth.isAuthenticated ? (
						<Redirect to="/dashboard" />
					) : (
						<Redirect to="/login" />
					)}
				</Route>
			</Switch>
		</Router>
	);
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
	return {
		initWallet: (state) => dispatch(initWalletAction(state)),
		setBitcoin: (state) => dispatch(setBitcoin(state)),
		setBrita: (state) => dispatch(setBrita(state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
