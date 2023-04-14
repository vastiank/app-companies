import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { getAllCompanies } from '../../../core/redux/slices/companySlice';
import {
	getCompanies,
	deleteCompany,
} from '../../../core/api/companies/companiesAPI';
import { validateRolUser } from '../../../core/utils/functions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';

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

export default function ListCompanies() {
	const [companies, setCompanies] = useState([]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { email } = useSelector((state) => state.user);

	const fetchCompanies = useCallback(async () => {
		const response = await getCompanies();
		setCompanies(response.companies);
		dispatch(getAllCompanies());
	}, [dispatch]);

	const deleteRegistry = async (id) => {
		await deleteCompany(id);
		toast.success('Registro eliminado');
		fetchCompanies();
	};

	const redirectToUpdate = async (companyData) => {
		const idCompanyParam = companyData._id;
		navigate(`/company/${idCompanyParam}`);
		sessionStorage.setItem('companyName', companyData.name);
		sessionStorage.setItem('companyNit', companyData.nit);
		sessionStorage.setItem('companyPhone', companyData.phone);
		sessionStorage.setItem('companyAddress', companyData.address);
	};

	const redirectToProducts = async (companyData) => {
		const idCompanyParam = companyData._id;

		navigate(`/company/${idCompanyParam}/products`);
		sessionStorage.setItem('companyName', companyData.name);
		sessionStorage.setItem('companyNit', companyData.nit);
		sessionStorage.setItem('companyPhone', companyData.phone);
		sessionStorage.setItem('companyAddress', companyData.address);
		sessionStorage.setItem('idCompanyParam', idCompanyParam);
	};

	const validateData = async () => {
		const response = await validateRolUser(email);

		sessionStorage.setItem('role', response.role);
	};

	useEffect(() => {
		validateData();
		fetchCompanies();
	}, []);

	return (
		<MainLayout>
			<Typography variant='h6' gutterBottom>
				Empresas
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell>NIT</StyledTableCell>
							<StyledTableCell align='center'>Nombre</StyledTableCell>
							<StyledTableCell align='center'>Dirección</StyledTableCell>
							<StyledTableCell align='center'>Telefono</StyledTableCell>
							{sessionStorage.getItem('role') === 'ADMIN_ROLE' && (
								<StyledTableCell align='center'>Acciones</StyledTableCell>
							)}
						</TableRow>
					</TableHead>
					{companies.length > 0 ? (
						<TableBody>
							{companies.map((row, index) => (
								<StyledTableRow key={index}>
									<StyledTableCell component='th' scope='row'>
										{row.nit}
									</StyledTableCell>
									<StyledTableCell align='center'>{row.name}</StyledTableCell>
									<StyledTableCell align='center'>
										{row.address}
									</StyledTableCell>
									<StyledTableCell align='center'>{row.phone}</StyledTableCell>
									{sessionStorage.getItem('role') === 'ADMIN_ROLE' && (
										<StyledTableCell align='center'>
											<AddShoppingCartIcon
												titleAccess='Productos'
												onClick={() => redirectToProducts(row)}
												style={{
													color: '#ccc',
													fontSize: '30',
													cursor: 'pointer',
													margin: '2',
												}}
											/>
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
					<Button onClick={() => navigate('/company')} variant='outlined'>
						CREAR EMPRESA
					</Button>
				</div>
			)}
			<ToastContainer />
		</MainLayout>
	);
}
