import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';
import AppCard from '../AppCard';
import FavoriteService from '../../../services/favorite/FavoriteService';
import { renderWithRouter } from '../../../services/test-service/router-render';

jest.mock('../../../services/favorite/FavoriteService');

describe('AppCard component', () => {
	afterEach(cleanup);

	let props = {};

	beforeEach(() => {
		props = Object.assign(
			{},
			{
				id: 'some-id',
				name: 'some-name',
				module: 'some-module',
				tagline: 'some-tag'
			}
		);
	});

	beforeAll(() => {
		FavoriteService.mockImplementation(() => {
			return {
				getFavoriteById: () => Promise.resolve([]),
				addToFavorites: () => Promise.resolve([])
			};
		});
	});

	test('should throws an warnig in development mode when required props are missing', () => {
		delete props.id;

		renderWithRouter(<AppCard {...props} />);

		jest.spyOn(global.console, 'warn');
	});

	test('should render a card with media when the props image_url has passed', () => {
		props.image_url = 'some';

		const { getByTestId } = renderWithRouter(<AppCard {...props} />);
		const target = getByTestId('image-card');

		expect(target).not.toBe(null);
	});

	test('should not to render a card with media when the props image_url has not passed', () => {
		const { queryByTestId } = renderWithRouter(<AppCard {...props} />);

		expect(queryByTestId('image-card')).toBe(null);
	});

	test('should render the item name received in props', () => {
		const { getByTestId } = renderWithRouter(<AppCard {...props} />);
		const target = getByTestId('item-name');

		expect(target.textContent).toBe('some-name');
	});

	test('should render the tag line and show the item caption', () => {
		const { getByTestId } = renderWithRouter(<AppCard {...props} />);
		const target = getByTestId('item-caption');

		expect(target).not.toBe(null);
		expect(target.textContent).toBe('some-tag');
	});

	test('should not to render the tagline when not passed to props', () => {
		delete props.tagline;

		const { queryByTestId } = renderWithRouter(<AppCard {...props} />);
		jest.spyOn(global.console, 'warn');

		expect(queryByTestId('item-caption')).toBe(null);
	});

	test('should render description', () => {
		props.description = 'some-description';

		const { getByTestId } = renderWithRouter(<AppCard {...props} />);
		const target = getByTestId('item-description');

		expect(target.textContent).toBe('some-description');
	});

	test('should not to render the description when not passed to props', () => {
		const { queryByTestId } = renderWithRouter(<AppCard {...props} />);

		expect(queryByTestId('item-description')).toBe(null);
	});

	test('should render the like button', () => {
		const { queryByTestId } = renderWithRouter(<AppCard {...props} />);

		const target = queryByTestId('like-button');
		expect(target).not.toBe(null);

		const button = queryByTestId('like-button-icon');
		expect(button).not.toBe(null);
		expect(button.title).toBe('Like');
	});

	test('should render click into like button', () => {
		const { queryByTestId } = renderWithRouter(<AppCard {...props} />);
		const button = queryByTestId('like-button-icon');

		fireEvent.click(button);
	});
});
