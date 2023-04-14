/* eslint-disable no-undef */

import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import App from '../App';
import Main from '../feature/pages/Main';
import ListCompanies from '../feature/pages/companies/ListCompanies';
import CompanyForm from '../feature/pages/companies/CompanyForm';
import ListProducts from '../feature/pages/products/ListProductsByCompany';
import ProductForm from '../feature/pages/products/ProductForm';

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

describe('App component', () => {
	it('renders the correct routes', () => {
		const wrapper = shallow(<App />);

		// Check the existence and paths of all the expected Route components
		expect(wrapper.find(Route).at(0).props().path).toEqual('/');
		expect(wrapper.find(Route).at(1).props().path).toEqual('*');
		expect(wrapper.find(Route).at(2).props().path).toEqual('/companies');
		expect(wrapper.find(Route).at(3).props().path).toEqual('/company');
		expect(wrapper.find(Route).at(4).props().path).toEqual(
			'/company/:idCompanyParam'
		);
		expect(wrapper.find(Route).at(5).props().path).toEqual(
			'/company/:idCompanyParam/products'
		);
		expect(wrapper.find(Route).at(6).props().path).toEqual(
			'/company/:idCompanyParam/product'
		);
		expect(wrapper.find(Route).at(7).props().path).toEqual(
			'/company/:idCompanyParam/product/:idProductParam'
		);

		// Check the corresponding components rendered for each Route
		expect(wrapper.find(Route).at(0).props().element.type).toEqual(Main);
		expect(wrapper.find(Route).at(1).props().element.type).toEqual(
			ListCompanies
		);
		expect(wrapper.find(Route).at(2).props().element.type).toEqual(
			ListCompanies
		);
		expect(wrapper.find(Route).at(3).props().element.type).toEqual(CompanyForm);
		expect(wrapper.find(Route).at(4).props().element.type).toEqual(CompanyForm);
		expect(wrapper.find(Route).at(5).props().element.type).toEqual(
			ListProducts
		);
		expect(wrapper.find(Route).at(6).props().element.type).toEqual(ProductForm);
		expect(wrapper.find(Route).at(7).props().element.type).toEqual(ProductForm);
	});
});
