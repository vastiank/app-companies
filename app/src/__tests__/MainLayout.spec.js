/* eslint-disable no-undef */

import { shallow } from 'enzyme';
import MainLayout from '../feature/layouts/MainLayout';

jest.mock('axios', () => {
	const axiosInstance = {
		get: jest.fn(),
		interceptors: {
			response: { use: jest.fn() },
		},
	};
	return {
		create: jest.fn(() => axiosInstance),
	};
});

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(), // mock the useNavigate hook
}));

describe('MainLayout Component', () => {
	it('renders children prop correctly', () => {
		const wrapper = shallow(
			<MainLayout>
				<p>Test Children</p>
			</MainLayout>
		);
		expect(wrapper.find('p').text()).toEqual('Test Children');
	});
});
