import { createSlice } from "@reduxjs/toolkit";
import { getCompanies } from "../../api/companies/companiesAPI";

const initialState = { listCompanies: [] };
const name = "company";

export const companySlice = createSlice({
  name,
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.listCompanies = action.payload;
    },
  },
});

export const { setCompanies } = companySlice.actions;
export default companySlice.reducer;

export const getAllCompanies = () => (dispatch) => {
  getCompanies()
    .then((response) => {
        console.log('response companies => ', response);
      dispatch(setCompanies(response));
    })
    .catch((error) => new Error(error));
};
