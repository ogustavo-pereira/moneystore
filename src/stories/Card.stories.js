import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '../components/Card';
const footerElement = () => {
	return (
		<p className="border-top">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis nec
			tellus dapibus, vestibulum lectus quis, gravida sapien.
		</p>
	);
};
storiesOf('Components|Card', module)
	.add('common', () => (
		<div className="p-20">
			<Card title="Card Component" description="Card Description">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis
					ante, accumsan nec lacus hendrerit, mollis cursus orci. Sed sit amet
					hendrerit libero. Nunc sollicitudin purus urna, et vehicula sem tempus
					eu. Morbi sit amet dolor efficitur nisi efficitur vulputate. Donec in
					diam dolor. Interdum et malesuada fames ac ante ipsum primis in
					faucibus. Donec venenatis mi augue, vitae sagittis diam accumsan sed.
					Pellentesque rhoncus nec urna nec pellentesque. Quisque posuere lectus
					est, eget pulvinar tortor tristique ut. Fusce non justo neque. Proin
					nec tellus dapibus, vestibulum lectus quis, gravida sapien.
				</p>
			</Card>
		</div>
	))
	.add('with footer', () => (
		<div className="p-20">
			<Card
				title="Card Component"
				description="Card Description"
				footer={footerElement()}
			>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus felis
					ante, accumsan nec lacus hendrerit, mollis cursus orci. Sed sit amet
					hendrerit libero. Nunc sollicitudin purus urna, et vehicula sem tempus
					eu. Morbi sit amet dolor efficitur nisi efficitur vulputate. Donec in
					diam dolor. Interdum et malesuada fames ac ante ipsum primis in
					faucibus. Donec venenatis mi augue, vitae sagittis diam accumsan sed.
					Pellentesque rhoncus nec urna nec pellentesque. Quisque posuere lectus
					est, eget pulvinar tortor tristique ut. Fusce non justo neque. Proin
					nec tellus dapibus, vestibulum lectus quis, gravida sapien.
				</p>
			</Card>
		</div>
	));
