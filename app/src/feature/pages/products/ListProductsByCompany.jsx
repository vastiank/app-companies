/* eslint-disable new-cap */
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MainLayout from '../../../shared/templates/MainLayout';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {
	getProducts,
	deleteProduct,
} from '../../../core/api/products/productsAPI';
import { validateRolUser } from '../../../core/utils/functions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import jsPDF from 'jspdf';

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
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export default function ListProducts() {
	const [products, setProducts] = useState([]);

	const navigate = useNavigate();

	const { email } = useSelector((state) => state.user);

	const fetchProducts = useCallback(async () => {
		const response = await getProducts();

		const productsByCompany = response.products.filter(
			(product) =>
				product.companyId === sessionStorage.getItem('idCompanyParam')
		);
		setProducts(productsByCompany);
	});

	const validateData = async () => {
		const response = await validateRolUser(email);
		sessionStorage.setItem('role', response.role);
	};

	const deleteRegistry = async (id) => {
		await deleteProduct(id);
		toast.success('Registro eliminado');
		fetchProducts();
	};

	const redirectToUpdate = async (productData) => {
		const idProductParam = productData._id;
		navigate(
			`/company/${sessionStorage.getItem(
				'idCompanyParam'
			)}/product/${idProductParam}`
		);
		sessionStorage.setItem('productName', productData.name);
		sessionStorage.setItem('productPrice', productData.price);
	};

	const generarPDF = () => {
		const doc = new jsPDF();

		products.forEach((product, index) => {
			const text = `${index + 1}. Nombre: ${product.name} - Precio: $${
				product.price
			}`;
			doc.text(text, 10, 10 + index * 10);
		});

		doc.save(`${sessionStorage.getItem('companyName')}_products.pdf`);
	};

	useEffect(() => {
		setTimeout(() => {
			validateData();
		}, 1000);
	}, []);

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<MainLayout>
			<Typography variant='h6' gutterBottom>
				Productos / {sessionStorage.getItem('companyName')}
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell align='center'>Nombre</StyledTableCell>
							<StyledTableCell align='center'>Precio</StyledTableCell>
							{sessionStorage.getItem('role') === 'ADMIN_ROLE' && (
								<StyledTableCell align='center'>Acciones</StyledTableCell>
							)}
						</TableRow>
					</TableHead>
					{products.length > 0 ? (
						<TableBody>
							{products.map((row, index) => (
								<StyledTableRow key={index}>
									<StyledTableCell align='center'>{row.name}</StyledTableCell>
									<StyledTableCell align='center'>{row.price}</StyledTableCell>
									{sessionStorage.getItem('role') === 'ADMIN_ROLE' && (
										<StyledTableCell align='center'>
											<EditIcon
												titleAccess='Actualizar'
												onClick={() => redirectToUpdate(row)}
												style={{
													color: '#07BE3E',
													fontSize: '30',
													cursor: 'pointer',
													margin: '2',
												}}
											/>
											<DeleteForeverIcon
												titleAccess='Eliminar'
												onClick={() => deleteRegistry(row._id)}
												style={{
													color: 'red',
													fontSize: '30',
													cursor: 'pointer',
													margin: '2',
												}}
											/>
										</StyledTableCell>
									)}
								</StyledTableRow>
							))}
						</TableBody>
					) : (
						<Typography variant='h6'>No hay registros</Typography>
					)}
				</Table>
			</TableContainer>
			{sessionStorage.getItem('role') === 'ADMIN_ROLE' && (
				<div className='flex justify-end mt-5'>
					<Button
						style={{ marginRight: 10 }}
						onClick={() =>
							navigate(
								`/company/${sessionStorage.getItem('idCompanyParam')}/product`
							)
						}
						variant='outlined'
					>
						CREAR PRODUCTO
					</Button>
					<Button onClick={generarPDF} variant='outlined'>
						DESCARGAR
					</Button>
				</div>
			)}
			<ToastContainer />
		</MainLayout>
	);
}
