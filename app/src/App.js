import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListCompanies from './feature/pages/companies/ListCompanies';
import CompanyForm from './feature/pages/companies/CompanyForm';
import ListProducts from './feature/pages/products/ListProductsByCompany';
import ProductForm from './feature/pages/products/ProductForm';
import Login from './feature/pages/login/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path='/' element={<Login />} />
				<Route path='*' element={<ListCompanies />} />
				<Route path='/companies' element={<ListCompanies />} />
				<Route path='/company' element={<CompanyForm />} />
				<Route path='/company/:idCompanyParam' element={<CompanyForm />} />
				<Route
					path='/company/:idCompanyParam/products'
					element={<ListProducts />}
				/>
				<Route
					path='/company/:idCompanyParam/product'
					element={<ProductForm />}
				/>
				<Route
					path='/company/:idCompanyParam/product/:idProductParam'
					element={<ProductForm />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
