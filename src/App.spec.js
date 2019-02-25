import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'react-testing-library';
import App from './App';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
	return {
		...render(<Router history={history}>{ui}</Router>),
		history
	};
}

test('full app rendering/navigating', () => {
	const { getByTestId } = renderWithRouter(<App />);

	const testTarget = getByTestId('app-root');

	expect(Object.keys(testTarget.children).length).toBeGreaterThan(0);
});
