import React from 'react';
import { storiesOf } from '@storybook/react';

import SimpleTable from '../components/SimpleTable';

const table = {
	head: ['From', 'To', 'Trade'],
	keys: ['from', 'to', 'action'],
	data: [
		{
			from: 'Biticoin',
			to: 'Brita',
			action: 'Trade',
		},
		{
			from: 'Brita',
			to: 'Bitcoin',
			action: 'Trade',
		},
	],
};
storiesOf('Components|SimpleTable', module)
	.add('common', () => (
		<div style={{ padding: 20 }}>
			<SimpleTable head={table.head} content={table.data} keys={table.keys} />
		</div>
	))
	.add('with title', () => (
		<div style={{ padding: 20 }}>
			<SimpleTable
				title={'Title Table'}
				head={table.head}
				content={table.data}
				keys={table.keys}
			/>
		</div>
	))
	.add('with no content', () => (
		<div style={{ padding: 20 }}>
			<SimpleTable
				title={'Title Table'}
				head={table.head}
				content={[]}
				keys={table.keys}
			/>
		</div>
	));
