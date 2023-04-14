import axios from 'axios';
import { toast } from 'react-toastify';
import { API_REST_IP } from './contants/endpoints';

const axiosInstance = axios.create({
	baseURL: API_REST_IP,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const responseHandler = (response) => response;
export const errorHandler = async (error) => Promise.reject(error);

axiosInstance.interceptors.response.use(
	(response) => responseHandler(response.data),
	(error) => {
		toast.error(error.response.data.message);

		errorHandler(error);
	}
);

export { axiosInstance };
