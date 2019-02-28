import React from 'react';
import App from './App';

import { renderWithRouter } from './services/test-service/router-render';

describe('App component', () => {
	test('full app rendering/navigating', () => {
		const { getByTestId } = renderWithRouter(<App />);

		const testTarget = getByTestId('app-root');

		expect(Object.keys(testTarget.children).length).toBeGreaterThan(0);
	});
});
