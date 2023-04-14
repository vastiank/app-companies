import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MainLayout from '../../../shared/templates/MainLayout';
import {
	postProduct,
	putProduct,
} from '../../../core/api/products/productsAPI';
import { toast } from 'react-toastify';

export default function ProductForm() {
	const navigate = useNavigate();
	const { idProductParam } = useParams();

	const formState = {
		name: '',
		price: '',
		companyId: sessionStorage.getItem('idCompanyParam'),
	};
	const [form, setForm] = useState(formState);

	const createNewCompany = async () => {
		await postProduct(form);
		toast.success('Registro creado con éxito');
		navigate(`/company/${sessionStorage.getItem('idCompanyParam')}/products`);
	};

	const updateCompany = async () => {
		await putProduct(idProductParam, form);
		toast.success('Registro actualizado con éxito');
		navigate(`/company/${sessionStorage.getItem('idCompanyParam')}/products`);
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		if (idProductParam !== undefined) {
			setForm({
				name: sessionStorage.getItem('productName'),
				price: sessionStorage.getItem('productPrice'),
			});
		}
	}, []);

	return (
		<MainLayout>
			<React.Fragment>
				<Typography variant='h6' gutterBottom>
					Producto
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							onChange={(e) => handleChange(e)}
							required
							id='name'
							name='name'
							label='Nombre'
							fullWidth
							autoComplete='given-name'
							variant='standard'
							value={form.name}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							onChange={(e) => handleChange(e)}
							required
							id='price'
							name='price'
							label='Precio'
							fullWidth
							autoComplete='family-name'
							variant='standard'
							value={form.price}
						/>
					</Grid>
				</Grid>
				<div className='flex justify-center mt-5'>
					{idProductParam !== undefined ? (
						<Button onClick={() => updateCompany()} variant='outlined'>
							ACTUALIZAR
						</Button>
					) : (
						<Button onClick={() => createNewCompany()} variant='outlined'>
							CREAR
						</Button>
					)}
				</div>
			</React.Fragment>
		</MainLayout>
	);
}
