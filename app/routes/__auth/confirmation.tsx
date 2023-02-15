import { useNavigate } from '@remix-run/react';
import { Button } from '~/components';
import logo from '~/images/Logo.png';

const ConfirmationRoute = () => {
	const navigate = useNavigate();

	return (
		<div id='confirmation-page' className='md:max-w-authForms'>
			<div className='rounded-lg bg-white px-8 pb-6 pt-10'>
				<div className='flex w-full justify-center'>
					<img src={logo} alt='blackmarket' />
				</div>

				<div className='mt-9 flex flex-col text-center'>
					<p>We’ve just sent you an email</p>
					<Button
						className='mt-4'
						label='Go back to login'
						variant='outline'
						onClick={() => navigate('/')}
						fullWidth
					/>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationRoute;
