import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://13.59.132.74:3000", //API REST endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Interceptor

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
