/* import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { getAllCompanies } from "../../../core/redux/slices/companySlice";
import { getCompanies } from "../../../core/api/companies/companiesAPI";
import { validateRolUser } from "../../../core/utils/functions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListProductsByCompany() {
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);

  const fetchProductsByCompany = useCallback(async () => {
    const response = await getCompanies();
    setProducts(response.companies);
    dispatch(getAllCompanies());
  });

  const validateData = async () => {
    const response = await validateRolUser(email);
    setUserData(response);
    console.log("userData => ", response);
  };

  useEffect(() => {
    setTimeout(() => {
      validateData();
    }, 1000);
  }, []);

  useEffect(() => {
    fetchCompanies();
    console.log("email from redux => ", email);
  }, []);

  return (
    <MainLayout>
      <h1>Productos : Empresa X</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NIT</StyledTableCell>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">Dirección</StyledTableCell>
              <StyledTableCell align="center">Telefono</StyledTableCell>
              
                <StyledTableCell align="center">Acciones</StyledTableCell>
              
            </TableRow>
          </TableHead>
          {companies.length > 0 && (
            <TableBody>
              {companies.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.nit}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.phone}</StyledTableCell>
                  {userData.role === "ADMIN_ROLE" && (
                    <StyledTableCell align="center">
                      <SettingsIcon
                        style={{
                          color: "#ccc",
                          fontSize: "30",
                          cursor: "pointer",
                        }}
                      />
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      
        <div className="flex justify-end mt-5">
          <Button onClick={() => navigate("/company")} variant="outlined">
            CREAR PRODUCTO
          </Button>
        </div>
      
    </MainLayout>
  );
}
 */