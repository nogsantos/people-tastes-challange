import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';
import AppInput from '../AppInput';
import { renderWithRouter } from '../../../services/test-service/router-render';

describe('AppInput component', () => {
	afterEach(cleanup);

	let props = {};

	beforeEach(() => {
		props = Object.assign(
			{},
			{
				id: 'some-id',
				label: 'some-label',
				value: 'some-value',
				onChange: () => {}
			}
		);
	});

	test('should throws an warnig in development mode when required props are missing', () => {
		delete props.id;

		renderWithRouter(<AppInput {...props} />);

		jest.spyOn(global.console, 'warn');
	});

	test('should render the input component', () => {
		const { getByTestId } = renderWithRouter(<AppInput {...props} />);
		const target = getByTestId('input-component');

		expect(target).not.toBe(null);
	});

	test('should render the input label by passed props', () => {
		const { getByLabelText } = renderWithRouter(<AppInput {...props} />);
		expect(getByLabelText(/some-label/i).value).toEqual(props.value);
	});

	test('should update input value in onChage event', () => {
		delete props.onChange;
		const handleChange = jest.fn();
		const { getByLabelText } = renderWithRouter(<AppInput {...props} onChange={handleChange} />);
		const inputTarget = getByLabelText(/some-label/i);
		const testValue = 'new-value';

		fireEvent.change(inputTarget, { target: { value: testValue } });

		expect(handleChange).toHaveBeenCalledTimes(1);

		expect(inputTarget.value).not.toBe(null);
	});

	test('should render a search icon with props to show are passed', () => {
		props.isTypeSearch = true;
		const { queryByTestId } = renderWithRouter(<AppInput {...props} />);
		const icon = queryByTestId('input-search-icon');

		expect(icon).not.toBe(null);
	});

    test('should not render the search icon with props to show are not passed', () => {
		const { queryByTestId } = renderWithRouter(<AppInput {...props} />);
		const icon = queryByTestId('input-search-icon');

		expect(icon).toBe(null);
    });

    test('should has the defined input classes', () => {
		const { getByTestId } = renderWithRouter(<AppInput {...props} />);
		const target = getByTestId('input-component');

        expect(target.className).toMatch(/AppInput-margin/);
		expect(target.className).toMatch(/AppInput-textField/);
	});
});
