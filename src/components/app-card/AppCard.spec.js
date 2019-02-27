import React from 'react';
import { cleanup } from 'react-testing-library';
import AppCard from './AppCard';
import FavoriteService from '../../services/favorite/FavoriteService';
import { renderWithRouter } from '../../services/test-service/router-render';

jest.mock('../../services/favorite/FavoriteService');

describe('AppCard component', () => {
	afterEach(cleanup);

	beforeAll(() => {
		FavoriteService.mockImplementation(() => {
			return {
				getFavoriteById: () => Promise.resolve([])
			};
		});
	});

	test('should throws an warnig in development mode when required props are missing', () => {
		const props = {
			name: 'some',
			module: 'some',
			tagline: 'some'
		};
		renderWithRouter(<AppCard {...props} />);
		jest.spyOn(global.console, 'warn');
	});

	test('should render a card with media when the props image_url has passed', () => {
		const props = {
			id: 'some',
			name: 'some',
			module: 'some',
			tagline: 'some',
			image_url: 'some'
		};

		const { render } = renderWithRouter(<AppCard {...props} />);

		console.log('render', render);

		// const { getByTestId, rerender } = render(<NumberDisplay number={1} />)
		// expect(getByTestId('number-display').textContent).toBe('1')
		// // re-render the same component with different props
		// rerender(<NumberDisplay number={2} />)
		// expect(getByTestId('number-display').textContent).toBe('2')
		// expect(getByTestId('instance-id').textContent).toBe('1')
	});
});
