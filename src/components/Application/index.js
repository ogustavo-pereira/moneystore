/**
 * @author oguhpereira
 * User register form
 */
import React from 'react';
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

const hist = createBrowserHistory();

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

const user = {
	isAuthenticated: false,
	authenticate(cb) {
		user.isAuthenticated = true;
	},
	signout(cb) {
		user.isAuthenticated = false;
	},
};

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

function Application({ auth }) {
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

export default connect(mapStateToProps, null)(Application);
