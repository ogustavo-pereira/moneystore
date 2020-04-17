import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../routes.js';

const switchRoutes = (
	<Switch>
		{routes.map((prop, key) => {
			if (prop.layout === '/login' || prop.layout === '/register') {
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
		<Redirect from="/" to="/login" />
	</Switch>
);

export default function Login() {
	return <div>{switchRoutes}</div>;
}
