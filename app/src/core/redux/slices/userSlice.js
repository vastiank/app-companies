import { createSlice } from "@reduxjs/toolkit";
import { authLogin } from "../../api/auth/authAPI";

const initialState = { data: "", email: "", role: "", userId: "" };
const name = "user";

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setEmail, setRole } = userSlice.actions;
export default userSlice.reducer;

export const login = (data) => (dispatch) => {
  authLogin(data)
    .then((response) => {
      dispatch(setUser(response.msg));
    })
    .catch((error) => new Error(error));
};

export const setAuthEmail = (email) => (dispatch) => {
  dispatch(setEmail(email));
};

export const setAuthRole = (role) => (dispatch) => {
  dispatch(setRole(role));
};
