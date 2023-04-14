import { axiosInstance } from "../../config/axiosInstance";
import { API_PRODUCTS } from '../../config/contants/products';

export const getProducts = async () => axiosInstance.get(API_PRODUCTS);
