import React from 'react';
import { shallow } from 'enzyme';

import Modal from './index';
import { RENDER_VALIDATION } from '../../constants';

const setUp = (props) =>
	shallow(
		<Modal {...props}>
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
		</Modal>
	);

describe('Modal Component', () => {
	let component;
	let mockProps = {};
	beforeEach(() => {
		mockProps = {
			header: {
				title: 'help',
				description: 'MoneyStore',
			},
			visible: true,
			hasCloseArea: true,
			callback: () => console.log('Callback'),
		};

		component = setUp(mockProps);
	});

	it(RENDER_VALIDATION, () => {
		expect(component.debug()).toMatchSnapshot();
	});

	it(`${RENDER_VALIDATION}, Header`, () => {
		const title = component.find('ModalTop');
		expect(title.length).toEqual(1);
	});

	it(`${RENDER_VALIDATION}, Content`, () => {
		const childen = component.find('.pTest');
		expect(childen.length).toEqual(1);
	});
});
