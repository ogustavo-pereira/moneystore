/**
 * @author oguhpereira
 * User register form
 */

import React from 'react';
import { Link } from 'react-router-dom';

import lang from '../../languages';
import { errorSpan } from '../../utils';

/**
 * @function save
 * @param data json form
 * Save element in localstorage
 */
function save(data) {
	const user = btoa(JSON.stringify(data));
	const email = btoa(data.email);
	const emails = JSON.parse(localStorage.getItem('emails') || '[]');
	const users = JSON.parse(localStorage.getItem('users') || '[]');

	if (emails.findIndex((e) => e === email) !== -1) {
		throw lang.email_already_registered;
	}

	emails.push(email);
	users.push(user);
	localStorage.setItem('emails', JSON.stringify(emails));
	localStorage.setItem('users', JSON.stringify(users));
	return true;
}

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.userNameGroup = React.createRef();
		this.emailGroup = React.createRef();
		this.passwordGroup = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * @function handleSubmit
	 * @param e element form
	 * Save User
	 */
	handleSubmit(e) {
		e.preventDefault();
		const target = e.target;

		try {
			if (this.errorValidationForm(target)) return;

			const data = {
				username: target.username.value,
				email: target.email.value,
				password: target.password.value,
			};
			//call apifunction
			const response = save(data);
			if (response) {
				this.props.history.push('/login');
			}
		} catch (e) {
			if (e === lang.email_already_registered) {
				this.emailGroup.current.append(
					errorSpan(lang.email_already_registered)
				);
				target.email.className = 'form-control input-error';
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
		if (!target.username.value) {
			this.userNameGroup.current.append(errorSpan(lang.fieldempty));
			target.username.className = 'form-control input-error';
			error = true;
		}

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
		const userNameError = this.userNameGroup.current.querySelector(
			'span.error-small'
		);
		const emailError = this.emailGroup.current.querySelector(
			'span.error-small'
		);
		const passwordError = this.passwordGroup.current.querySelector(
			'span.error-small'
		);
		if (userNameError) {
			clear = true;
			userNameError.remove();
			target.username.className = 'form-control';
		}
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
			<div className="container-center">
				<div className="box wrap-box-center">
					<div>
						<h1 className="title">{lang.register}</h1>
						<form
							onSubmit={this.handleSubmit}
							autoComplete="off"
							method="post"
							action=""
						>
							<div ref={this.userNameGroup} className="form-group">
								<label className="label" htmlFor="username">
									{lang.username}
								</label>
								<input className="form-control" type="text" id="username" />
							</div>
							<div ref={this.emailGroup} className="form-group">
								<label className="label" htmlFor="email">
									{lang.email}
								</label>
								<input className="form-control" type="email" id="email" />
							</div>
							<div ref={this.passwordGroup} className="form-group">
								<label className="label" htmlFor="password">
									{lang.password}
								</label>
								<input className="form-control" type="password" id="password" />
							</div>
							<Link to="/login" className="mb-20 fr">
								{lang.login}
							</Link>
							<button className="btn btn-success mt-10 clear">
								{lang.register}
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterForm;
