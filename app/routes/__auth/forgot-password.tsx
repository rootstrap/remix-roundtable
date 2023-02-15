import { Link } from '@remix-run/react';
import { Button, InputField } from '~/components';
import logo from '~/images/Logo.png';

enum FormFields {
	email = 'email',
}

const PasswordRecoveryRoute = () => {
	return (
		<div id='forgot-password-page' className='md:max-w-authForms'>
			<form action='/auth/forgot-password' className='rounded-lg bg-white px-8 pt-10 pb-6'>
				<div className='flex w-full justify-center'>
					<img src={logo} alt='blackmarket' />
				</div>

				<p className='mt-9 text-center'>
					Please type your email adrdress below in order to recover your password.
				</p>

				<div className='mt-2 flex flex-col'>
					<InputField label='Email' name={FormFields.email} isRequired type='email' />
					<Button className='mt-4' label='Recover password' type='submit' variant='primary' />
					<Link to='/'>
						<Button
							className='mt-4'
							label='Go back to login'
							type='submit'
							variant='outline'
							onClick={() => console.log('Go back to login')}
							fullWidth
						/>
					</Link>
				</div>
			</form>
		</div>
	);
};

export default PasswordRecoveryRoute;
