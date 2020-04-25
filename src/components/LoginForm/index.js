/**
 * @author oguhpereira
 * User login form
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import lang from '../../languages';
import * as AuthActions from '../../store/actions/auth';
import { errorSpan } from '../../utils';

/**
 * @function login
 * @param {Object} data json form
 * @return {String} login auth
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
	const userAuth = btoa(userFound + userWantLogin.email);
	const dataUser = JSON.parse(localStorage.getItem('data') || '{}');
	localStorage.setItem('auth', userAuth);

	if (!(userAuth in dataUser)) {
		dataUser[userAuth] = btoa(
			JSON.stringify({
				money: 100000,
				totalInvested: 0,
				operations: [],
				coins: [
					{ name: 'BitCoin', value: 0 },
					{ name: 'Brita', value: 0 },
				],
			})
		);
		localStorage.setItem('data', JSON.stringify(dataUser));
	}

	return btoa(userFound + userWantLogin.email);
}

/**
 * @function LoginForm
 * @return {JSX}
 * render
 */
function LoginForm(props) {
	const userAuth = localStorage.getItem('auth');
	const dataUser = JSON.parse(localStorage.getItem('data') || '{}');

	if (userAuth in dataUser) {
		props.login(userAuth);
	}

	localStorage.setItem('auth', null);
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

			const token = login({
				email: target.email.value,
				password: target.password.value,
			});

			if (token) {
				props.login(token);
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
					<input className="form-control" type="text" id="email" />
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

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
