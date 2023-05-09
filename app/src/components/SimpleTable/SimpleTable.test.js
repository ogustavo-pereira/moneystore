import React from 'react';
import { shallow } from 'enzyme';

import SimpleTable from './index';
import { RENDER_VALIDATION } from '../../constants';

const setUp = (props) => shallow(<SimpleTable {...props} />);

describe('SimpleTable Component', () => {
	let component;
	let mockProps = {};
	beforeEach(() => {
		mockProps = {
			title: 'Simple Table',
			head: ['Name', 'Price'],
			keys: ['name', 'price'],
			content: [{ name: 'Test1', price: 1000 }],
		};

		component = setUp(mockProps);
	});

	it(RENDER_VALIDATION, () => {
		expect(component.debug()).toMatchSnapshot();
	});
});
