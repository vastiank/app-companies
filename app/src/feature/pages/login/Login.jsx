import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setAuthEmail } from '../../../core/redux/slices/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authLogin } from '../../../core/api/auth/authAPI';

const theme = createTheme();

export default function Login() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const formState = {
		email: '',
		password: '',
	};
	const [form, setForm] = useState(formState);

	const handleSubmit = (event) => {
		event.preventDefault();
		onLogin();
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const onLogin = async () => {
		dispatch(setAuthEmail(form.email));

		const responseAuth = await authLogin(form);
		console.log('responseAuth => ', responseAuth);
		if (responseAuth.msg === 'Auth Login Ok!') navigate('/companies');
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<Grid container component='main' sx={{ height: '100vh' }}>
					<CssBaseline />
					<Grid
						item
						xs={false}
						sm={4}
						md={7}
						sx={{
							backgroundImage:
								'url(https://cdn.pixabay.com/photo/2018/03/09/08/36/businessman-3210932_1280.jpg)',
							backgroundRepeat: 'no-repeat',
							backgroundColor: (t) =>
								t.palette.mode === 'light'
									? t.palette.grey[50]
									: t.palette.grey[900],
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					/>
					<Grid
						item
						xs={12}
						sm={8}
						md={5}
						component={Paper}
						elevation={6}
						square
					>
						<Box
							sx={{
								my: 8,
								mx: 4,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Iniciar sesión
							</Typography>
							<Box
								component='form'
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 1 }}
							>
								<TextField
									onChange={(e) => handleChange(e)}
									margin='normal'
									required
									fullWidth
									id='email'
									label='Correo electrónico'
									name='email'
									autoComplete='email'
									autoFocus
								/>
								<TextField
									onChange={(e) => handleChange(e)}
									margin='normal'
									required
									fullWidth
									name='password'
									label='Contraseña'
									type='password'
									id='password'
									autoComplete='current-password'
								/>

								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}
								>
									INICIAR
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</ThemeProvider>
			<ToastContainer />
		</>
	);
}
