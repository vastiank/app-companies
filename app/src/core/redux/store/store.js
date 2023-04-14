import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import companyReducer from "../slices/companySlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer
  },
});

export default store;