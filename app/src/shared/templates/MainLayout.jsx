/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const MainLayout = ({ children }) => {
	const navigate = useNavigate();
	return (
		<div>
			<div className='flex justify-end items-center h-20 bg-teal-500 p-5'>
				<LogoutIcon
					titleAccess='Salir'
					onClick={() => navigate('/')}
					style={{ color: '#fff', fontSize: 30, cursor: 'pointer' }}
				/>
			</div>
			<div className='m-10'>{children}</div>
		</div>
	);
};

export default MainLayout;
