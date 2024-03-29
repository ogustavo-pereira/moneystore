/**
 * @author oguhpereira
 * Aplication
 */
import React, { useEffect, useState } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect, useSelector } from 'react-redux';

import LeftBar from '../LeftBar';
import RightBar from '../RightBar';
import { PrivateRoutes, PublicRoutes } from '../../routes';
import { setWallet as setWalletAction } from '../../store/actions/wallet';
import * as ApplicationAPI from './AplicationAPI';
import { setBitcoin, setBrita } from '../../store/actions/price';
import { login } from '../../store/actions/auth';
import CloseIcon from '../../images/close.svg';

const hist = createBrowserHistory();
/**
 * @function Container
 * @param {JSX} children
 * @param {Boolean} isPublic
 * @returns {JSX}
 */
function Container({ children, isPublic }) {
	const [collapseMenu, setCollapseMenu] = useState(
		sessionStorage.getItem('collapse-menu') || true
	);

	function handleCollapse() {
		sessionStorage.getItem('collapse-menu', !collapseMenu);
		setCollapseMenu(!collapseMenu);
	}

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
			<div
				className={`right-content ${
					collapseMenu && window.screen.width < 950 ? '' : 'collapse-menu'
				}`}
			>
				<RightBar />
			</div>
			{window.screen.width < 950 && (
				<span
					onClick={() => handleCollapse()}
					className={`collapse-btn ${collapseMenu ? 'right-5' : 'right-285'}`}
				>
					<img
						width="20px"
						className={collapseMenu && 'rotate-180'}
						src={CloseIcon}
						alt="Collapse"
						title="Collapse"
					/>
				</span>
			)}
		</div>
	);
}

/**
 * @function PrivateRoute
 * @param {Object} props from application
 * @returns {JSX}
 */
function PrivateRoute(props) {
	const auth = useSelector((state) => state.auth);

	return (
		<Route
			{...props.rest}
			render={({ location }) =>
				auth.isAuthenticated || localStorage.getItem('auth') ? (
					<Container>
						<props.component />
					</Container>
				) : (
					<Redirect to={'/login'} />
				)
			}
		/>
	);
}

/**
 * @function Application
 * @param {Object} auth
 * @param {Function} setWallet
 * @param {Function} setBitcoin
 * @param {Function} setBrita
 * @returns {JSX}
 */
function Application({ auth, setWallet, setBitcoin, setBrita }) {
	useEffect(() => {
		if (auth.isAuthenticated) {
			getWallet();
			setInterval(() => watchBitcoin(), 30000);
			setInterval(() => watchBrita(), 3600000);
			watchBitcoin();
			watchBrita();
			return;
		}
		async function watchBitcoin() {
			setBitcoin(parseFloat(await ApplicationAPI.getBitCoinPrice()));
		}
		async function watchBrita() {
			setBrita(await ApplicationAPI.getBritaPrice(new Date()));
		}
		async function getWallet() {
			setWallet(ApplicationAPI.getWallet());
		}
	});

	return (
		<Router history={hist}>
			<Switch>
				{PublicRoutes.map((props, index) => (
					<Route key={index} {...props}>
						<Container isPublic>
							<props.component />
						</Container>
					</Route>
				))}
				{PrivateRoutes.map((props, index) => (
					<PrivateRoute key={index} {...props} />
				))}
				<Route>
					{auth.isAuthenticated ? (
						<Redirect from="/" to="/dashboard" />
					) : (
						<Redirect from="/" to="/login" />
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
		setWallet: (state) => dispatch(setWalletAction(state)),
		setBitcoin: (state) => dispatch(setBitcoin(state)),
		setBrita: (state) => dispatch(setBrita(state)),
		login: (state) => dispatch(login(state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
