import { getUsers } from "../api/users/usersAPI";

export const validateRolUser = async (emailAuth) => {
    const responseUsers = await getUsers();
    const authUser = responseUsers.users.find((user) => user.email === emailAuth);
    return authUser;
};

