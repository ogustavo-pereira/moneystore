/**
 * @author oguhpereira
 * User register form
 */

import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import lang from '../../languages';
import { errorSpan } from '../../utils';

/**
 * @function save
 * @param {Object} data json form
 * @returns {Boolean}
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

/**
 * @function RegisterForm
 * @return {JSX}
 * render
 */
function RegisterForm() {
	let history = useHistory();
	const userNameGroup = useRef(null);
	const emailGroup = useRef(null);
	const passwordGroup = useRef(null);

	/**
	 * @function handleSubmit
	 * @param {Element} e element form
	 * Save User
	 */
	function handleSubmit(e) {
		e.preventDefault();
		const target = e.target;

		try {
			if (errorValidationForm(target)) return;

			const data = {
				username: target.username.value,
				email: target.email.value,
				password: target.password.value,
			};
			//call apifunction
			const response = save(data);
			if (response) {
				history.push('/login');
			}
		} catch (e) {
			if (e === lang.email_already_registered) {
				emailGroup.current.append(errorSpan(lang.email_already_registered));
				target.email.className = 'form-control input-error';
			}
		}
	}

	/**
	 * @function errorValidationForm
	 * @param {Element} target element form
	 * @return {Boolean}
	 * Validation of form fields
	 */
	function errorValidationForm(target) {
		let error = false;
		clearError(target);
		if (!target.username.value) {
			userNameGroup.current.append(errorSpan(lang.fieldempty));
			target.username.className = 'form-control input-error';
			error = true;
		}

		if (!target.email.value) {
			emailGroup.current.append(errorSpan(lang.fieldempty));
			target.email.className = 'form-control input-error';
			error = true;
		}

		if (!target.password.value) {
			passwordGroup.current.append(errorSpan(lang.fieldempty));
			target.password.className = 'form-control input-error';
			error = true;
		}

		return error;
	}

	/**
	 * @function clearError
	 * @param {Element} target element form
	 * @return {Boolean}
	 * clears form errors
	 */
	function clearError(target) {
		let clear = false;
		const userNameError = userNameGroup.current.querySelector(
			'span.error-small'
		);
		const emailError = emailGroup.current.querySelector('span.error-small');
		const passwordError = passwordGroup.current.querySelector(
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

	return (
		<div>
			<h1 className="title">{lang.register}</h1>
			<form onSubmit={handleSubmit} autoComplete="off" method="post" action="">
				<div ref={userNameGroup} className="form-group">
					<label className="label" htmlFor="username">
						{lang.username}
					</label>
					<input className="form-control" type="text" id="username" />
				</div>
				<div ref={emailGroup} className="form-group">
					<label className="label" htmlFor="email">
						{lang.email}
					</label>
					<input className="form-control" type="email" id="email" />
				</div>
				<div ref={passwordGroup} className="form-group">
					<label className="label" htmlFor="password">
						{lang.password}
					</label>
					<input className="form-control" type="password" id="password" />
				</div>
				<Link to="/login" className="mb-20 fr">
					{lang.login}
				</Link>
				<button className="btn btn-success mt-10 clear">{lang.register}</button>
			</form>
		</div>
	);
}

export default RegisterForm;
