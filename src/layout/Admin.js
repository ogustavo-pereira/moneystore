/**
 * @author oguhpereira
 * User register form
 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../routes.js';
import LeftBar from '../components/LeftBar/index.js';
import RightBar from '../components/RightBar/index.js';

const switchRoutes = (
	<Switch>
		{routes.map((prop, key) => {
			if (prop.layout === '/user') {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			}
			return null;
		})}
		<Redirect from="/" to="/user" />
	</Switch>
);

export default function Admin() {
	return (
		<div className="app-content">
			<div className="left-content">
				<LeftBar />
			</div>
			<div className="main-content">{switchRoutes}</div>
			<div className="right-content">
				<RightBar />
			</div>
		</div>
	);
}
