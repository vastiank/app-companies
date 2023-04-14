import { axiosInstance } from '../../config/axiosInstance';
import { API_PRODUCTS } from '../../config/contants/products';

export const getProducts = async () => axiosInstance.get(API_PRODUCTS);
export const postProduct = async (data) =>
	axiosInstance.post(API_PRODUCTS, data);
export const putProduct = async (id, data) =>
	axiosInstance.put(`${API_PRODUCTS}/${id}`, data);
export const deleteProduct = async (id) =>
	axiosInstance.delete(`${API_PRODUCTS}/${id}`);
