import { axiosInstance } from "../../config/axiosInstance";
import { API_COMPANIES } from "../../config/contants/companies";

export const getCompanies = async () => axiosInstance.get(API_COMPANIES);
export const postCompany = async (data) => axiosInstance.post(API_COMPANIES, data);
export const putCompany = async (id, data) => axiosInstance.put(`${API_COMPANIES}/${id}`, data);
export const deleteCompany = async (id) => axiosInstance.delete(`${API_COMPANIES}/${id}`);


