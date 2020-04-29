import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '../components/Modal';

storiesOf('Components|Modal', module)
	.add('common', () => (
		<div style={{ padding: 20 }}>
			<Modal
				header={{
					title: 'Modal',
				}}
				callback={() => {
					console.log('Close');
				}}
				visible
			>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis
					nec tellus dapibus, vestibulum lectus quis, gravida sapien.
				</p>
			</Modal>
		</div>
	))
	.add('with description', () => (
		<div style={{ padding: 20 }}>
			<Modal
				header={{
					title: 'Modal',
					description: 'Description Modal',
				}}
				callback={() => {
					console.log('Close');
				}}
				visible
			>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis
					nec tellus dapibus, vestibulum lectus quis, gravida sapien.
				</p>
			</Modal>
		</div>
	))
	.add('with hasCloseArea', () => (
		<div style={{ padding: 20 }}>
			<Modal
				header={{
					title: 'Modal',
					description: 'Description Modal',
				}}
				callback={() => {
					console.log('Close');
				}}
				visible
				hasCloseArea
			>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis
					nec tellus dapibus, vestibulum lectus quis, gravida sapien.
				</p>
			</Modal>
		</div>
	));
