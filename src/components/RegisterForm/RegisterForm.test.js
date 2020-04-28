import React from 'react';
import { shallow } from 'enzyme';
import routeData from 'react-router';

import RegisterForm from './index';
import { FORM_VALIDATION } from '../../constants';

const setUp = () => shallow(<RegisterForm />);

describe('RegisterForm Component', () => {
	let component;

	beforeEach(() => {
		const mockHistory = {
			pathname: '/register',
		};
		jest.spyOn(routeData, 'useHistory').mockReturnValue(mockHistory);
		component = setUp();
	});

	it(FORM_VALIDATION, () => {
		const username = component.find(`input[type='text'][id='username']`);
		const email = component.find(`input[type='email'][id='email']`);
		const password = component.find(`input[type='password'][id='password']`);
		const submit = component.find(`button`);
		expect(
			username.length + password.length + email.length + submit.length
		).toBe(4);
	});
});
