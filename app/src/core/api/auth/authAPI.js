import { axiosInstance } from "../../config/axiosInstance";
import { AUTH_LOGIN } from '../../config/contants/auth';

export const authLogin = async (data) => axiosInstance.post(AUTH_LOGIN, data);
