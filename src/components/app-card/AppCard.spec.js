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

		const { getByTestId } = renderWithRouter(<AppCard {...props} />);
		const target = getByTestId('image-card');
		expect(target).not.toBe(null);
	});

	// test('should not to render a card with media when the props image_url has not passed', () => {
	// 	const props = {
	// 		id: 'some',
	// 		name: 'some',
	// 		module: 'some',
    //         tagline: 'some',
    //         image_url: 'some'
	// 	};
	// 	const { getByTestId } = renderWithRouter(<AppCard {...props} />);
    //     getByTestId('image-card');

    //     console.log('get', getByTestId);

    //     // expect(e).toBeUndefined();
	// });
});
