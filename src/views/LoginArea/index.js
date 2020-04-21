/**
 * @author oguhpereira
 * Login and Register Page
 */
import React from 'react';

import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';
import './login.css';

export default function LoginArea(props) {
	return (
		<div className="container-login">
			<div className="box wrap-login">
				{props.location.pathname === '/register' ? (
					<RegisterForm {...props} />
				) : (
					<LoginForm />
				)}
			</div>
		</div>
	);
}
