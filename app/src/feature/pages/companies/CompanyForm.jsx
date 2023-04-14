import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MainLayout from "../../layouts/MainLayout";
import {
  postCompany,
  putCompany,
} from "../../../core/api/companies/companiesAPI";
import { toast } from "react-toastify";

export default function CompanyForm() {
  const navigate = useNavigate();
  const { idCompanyParam } = useParams();

  const formState = {
    nit: "",
    name: "",
    address: "",
    phone: "",
  };
  const [form, setForm] = useState(formState);

  const createNewCompany = async () => {
    await postCompany(form);
    toast.success("Registro creado con éxito");
    navigate("/companies");
  };

  const updateCompany = async () => {
    await putCompany(idCompanyParam, form);
    toast.success("Registro actualizado con éxito");
    navigate("/companies");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("id param => ", idCompanyParam);
    if (idCompanyParam !== undefined) {
      setForm({
        name: sessionStorage.getItem("companyName"),
        nit: sessionStorage.getItem("companyNit"),
        phone: sessionStorage.getItem("companyPhone"),
        address: sessionStorage.getItem("companyAddress"),
      });
    }
  }, []);

  return (
    <MainLayout>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Empresa
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => handleChange(e)}
              required
              id="nit"
              name="nit"
              label="NIT"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={form.nit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => handleChange(e)}
              required
              id="name"
              name="name"
              label="Nombre"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={form.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => handleChange(e)}
              required
              id="address"
              name="address"
              label="Dirección"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={form.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => handleChange(e)}
              required
              id="phone"
              name="phone"
              label="Teléfono"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={form.phone}
            />
          </Grid>
        </Grid>
        <div className="flex justify-center mt-5">
          {idCompanyParam !== undefined ? (
            <Button onClick={() => updateCompany()} variant="outlined">
              ACTUALIZAR
            </Button>
          ) : (
            <Button onClick={() => createNewCompany()} variant="outlined">
              CREAR
            </Button>
          )}
        </div>
      </React.Fragment>
    </MainLayout>
  );
}
