import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

addParameters({
	options: {
		theme: create({
			base: 'dark',
			brandTitle: 'MoneyStore',
			brandUrl: 'https://github.com/oguhpereira/moneystore',
		}),
		hierarchySeparator: /\//,
		hierarchyRootSeparator: /\|/,
	},
});

configure(() => {
	require('../src/index.css');
	const componentStories = require.context('../src', true, /(stories|story)\.js$/);
	return componentStories
		.keys()
		.map(componentStories)
		.filter((module) => module.default && module.default.title);
}, module);
