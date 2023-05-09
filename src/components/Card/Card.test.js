import React from 'react';
import { shallow } from 'enzyme';

import Card from './index';
import { RENDER_VALIDATION } from '../../constants';

const footerElemt = () => (
	<p className="footerTest">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis ante,
		accumsan nec lacus hendrerit, mollis cursus orci. Sed sit amet hendrerit
		libero. Nunc sollicitudin purus urna, et vehicula sem tempus eu. Morbi sit
		amet dolor efficitur nisi efficitur vulputate. Donec in diam dolor. Interdum
		et malesuada fames ac ante ipsum primis in faucibus. Donec venenatis mi
		augue, vitae sagittis diam accumsan sed. Pellentesque rhoncus nec urna nec
		pellentesque. Quisque posuere lectus est, eget pulvinar tortor tristique ut.
		Fusce non justo neque. Proin nec tellus dapibus, vestibulum lectus quis,
		gravida sapien.
	</p>
);
const setUp = (props) =>
	shallow(
		<Card {...props}>
			<p className="pTest">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis
				ante, accumsan nec lacus hendrerit, mollis cursus orci. Sed sit amet
				hendrerit libero. Nunc sollicitudin purus urna, et vehicula sem tempus
				eu. Morbi sit amet dolor efficitur nisi efficitur vulputate. Donec in
				diam dolor. Interdum et malesuada fames ac ante ipsum primis in
				faucibus. Donec venenatis mi augue, vitae sagittis diam accumsan sed.
				Pellentesque rhoncus nec urna nec pellentesque. Quisque posuere lectus
				est, eget pulvinar tortor tristique ut. Fusce non justo neque. Proin nec
				tellus dapibus, vestibulum lectus quis, gravida sapien.
			</p>
		</Card>
	);

describe('Card Component', () => {
	let component;
	let mockProps = {};
	beforeEach(() => {
		mockProps = {
			title: 'Test',
			description: 'Description',
			footer: footerElemt(),
		};

		component = setUp(mockProps);
	});

	it(RENDER_VALIDATION, () => {
		expect(component.debug()).toMatchSnapshot();
	});

	it(`${RENDER_VALIDATION}, Description`, () => {
		let description = component.find('.card-category');
		expect(description.length).toEqual(1);

		mockProps = {
			title: 'Test',
		};

		component = setUp(mockProps);
		description = component.find('.card-category');

		expect(description.length).toEqual(0);
	});

	it(`${RENDER_VALIDATION}, Content`, () => {
		const childen = component.find('.pTest');
		expect(childen.length).toEqual(1);
	});

	it(`${RENDER_VALIDATION}, Footer`, () => {
		let footer = component.find('.footerTest');
		expect(footer.length).toEqual(1);

		mockProps = {
			title: 'Test',
			description: 'Description',
		};

		component = setUp(mockProps);
		footer = component.find('.footerTest');

		expect(footer.length).toEqual(0);
	});
});
