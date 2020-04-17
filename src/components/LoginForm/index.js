/**
 * @author oguhpereira
 * User login form
 */

import React from 'react';
import { Link } from 'react-router-dom';

import lang from '../../languages';
import { errorSpan } from '../../utils';

/**
 * @function login
 * @param data json form
 * login user
 */
function login(userWantLogin) {
	const emailWantLogin = btoa(userWantLogin.email);
	const emails = JSON.parse(localStorage.getItem('emails') || '[]');
	const users = JSON.parse(localStorage.getItem('users') || '[]');
	const userFound = emails.findIndex((e) => e === emailWantLogin);

	if (userFound === -1) {
		throw lang.user_not_found;
	}

	const decriptyUser = JSON.parse(atob(users[userFound]));
	if (
		decriptyUser.email !== userWantLogin.email ||
		decriptyUser.password !== userWantLogin.password
	) {
		throw lang.password_error;
	}

	return true;
}

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.emailGroup = React.createRef();
		this.passwordGroup = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * @function handleSubmit
	 * @param  e element form
	 * Login User
	 */
	handleSubmit(e) {
		e.preventDefault();
		const target = e.target;
		try {
			if (this.errorValidationForm(target)) return;

			const response = login({
				email: target.email.value,
				password: target.password.value,
			});
			if (response) {
				console.log('LOGGED');
			}
		} catch (e) {
			if (e === lang.user_not_found) {
				this.emailGroup.current.append(errorSpan(lang.user_not_found));
				target.email.className = 'form-control input-error';
			} else if (e === lang.password_error) {
				this.passwordGroup.current.append(errorSpan(lang.password_error));
				target.password.className = 'form-control input-error';
			}
		}
	}

	/**
	 * @function errorValidationForm
	 * @param target element form
	 * @return boolean
	 * Validation of form fields
	 */
	errorValidationForm(target) {
		let error = false;
		this.clearError(target);

		if (!target.email.value) {
			this.emailGroup.current.append(errorSpan(lang.fieldempty));
			target.email.className = 'form-control input-error';
			error = true;
		}

		if (!target.password.value) {
			this.passwordGroup.current.append(errorSpan(lang.fieldempty));
			target.password.className = 'form-control input-error';
			error = true;
		}

		return error;
	}

	/**
	 * @function clearError
	 * @param target element form
	 * @return boolean
	 * clears form errors
	 */
	clearError(target) {
		let clear = false;
		const emailError = this.emailGroup.current.querySelector(
			'span.error-small'
		);
		const passwordError = this.passwordGroup.current.querySelector(
			'span.error-small'
		);
		if (emailError) {
			clear = true;
			emailError.remove();
			target.email.className = 'form-control';
		}
		if (passwordError) {
			clear = true;
			passwordError.remove();
			target.password.className = 'form-control';
		}
		return clear;
	}

	render() {
		return (
			<div>
				<h1 className="title">{lang.login}</h1>
				<form
					onSubmit={this.handleSubmit}
					autoComplete="off"
					method="post"
					action=""
				>
					<div ref={this.emailGroup} className="form-group">
						<label className="label" htmlFor="email">
							{lang.email}
						</label>
						<input className="form-control" type="text" id="email" />
					</div>
					<div ref={this.passwordGroup} className="form-group">
						<label className="label" htmlFor="password">
							{lang.password}
						</label>
						<input className="form-control" type="password" id="password" />
					</div>
					<Link to="/register" className="mb-20 fr">
						{lang.register}
					</Link>
					<button className="btn btn-success mt-10 clear">{lang.next}</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
