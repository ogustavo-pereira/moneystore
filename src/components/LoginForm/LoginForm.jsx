/**
 * @author oguhpereira
 * User login form
 */

import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import lang from '../../constants/languages';
import { errorSpan } from '../../helpers/utils';
import * as LoginFormAPI from './LoginFormAPI';

/**
 * @function LoginForm
 * @param {Function} login
 * @return {JSX}
 * render
 */
export default function LoginForm({ login }) {
	let history = useHistory();
	const emailGroup = useRef(null);
	const passwordGroup = useRef(null);

	/**
	 * @function handleSubmit
	 * @param  {Event} e
	 * Login User
	 */
	function handleSubmit(e) {
		e.preventDefault();
		const target = e.target;
		try {
			if (errorValidationForm(target)) return;

			const token = LoginFormAPI.login({
				email: target.email.value,
				password: target.password.value,
			});

			if (token) {
				login(token);
				history.push('/dashboard');
			}
		} catch (e) {
			if (e === lang.user_not_found) {
				emailGroup.current.append(errorSpan(lang.user_not_found));
				target.email.className = 'form-control input-error';
			} else if (e === lang.password_error) {
				passwordGroup.current.append(errorSpan(lang.password_error));
				target.password.className = 'form-control input-error';
			}
		}
	}

	/**
	 * @function errorValidationForm
	 * @param {Element} target element form
	 * @return {boolean}
	 * Validation of form fields
	 */
	function errorValidationForm(target) {
		let error = false;
		clearError(target);

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
	 * @return {boolean}
	 * clears form errors
	 */
	function clearError(target) {
		let clear = false;
		const emailError = emailGroup.current.querySelector('span.error-small');
		const passwordError = passwordGroup.current.querySelector(
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

	return (
		<div>
			<h1 className="title">{lang.login}</h1>
			<form onSubmit={handleSubmit} autoComplete="off" method="post" action="">
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
				<Link to="/register" className="mb-20 fr">
					{lang.register}
				</Link>
				<button className="btn btn-success mt-10 clear">{lang.next}</button>
			</form>
		</div>
	);
}
