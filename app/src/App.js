import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './feature/pages/Main';
import ListCompanies from "./feature/pages/companies/ListCompanies";
import CompanyForm from "./feature/pages/companies/CompanyForm";
/* import list from "./feature/pages/products/ListProductsByCompany"
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index path="/login" element={<Main />} /> */}
        <Route index path="/" element={<Main />} />
        <Route path="*" element={<ListCompanies />} />
        <Route path="/companies" element={<ListCompanies />} />
        <Route path="/company" element={<CompanyForm />} />
        <Route path="/company/:idCompanyParam" element={<CompanyForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
