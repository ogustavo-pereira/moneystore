import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';
import { FORM_VALIDATION } from '../../constants';


const setUp = () => shallow(<LoginForm />);

describe('LoginForm Component', () => {
	let component;
	beforeEach(() => {
		component = setUp();
	});

	it(FORM_VALIDATION, () => {
		const email = component.find(`input[type='email'][id='email']`);
		const password = component.find(`input[type='password'][id='password']`);
		const submit = component.find(`button`);
		expect(password.length + email.length + submit.length).toBe(3);
	});
});
