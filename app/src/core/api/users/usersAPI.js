import { axiosInstance } from '../../config/axiosInstance';
import { GET_USERS } from '../../config/contants/users';

export const getUsers = async () => axiosInstance.get(GET_USERS);
