import { Link } from '@remix-run/react';
import { Button, InputField } from '~/components';
import logo from '~/images/Logo.png';

enum FormFields {
	email = 'email',
	password = 'password',
}

const LoginRoute = () => {
	return (
		<div id='login-page' className='md:max-w-authForms'>
			<form action='/auth/signin' className='rounded-lg bg-white px-8 pt-10 pb-6'>
				<div className='flex w-full justify-center'>
					<img src={logo} alt='blackmarket' />
				</div>

				<div className='mt-8 flex flex-col'>
					<InputField label='Email' name={FormFields.email} isRequired type='email' />
					<InputField label='Password' name={FormFields.password} type='password' isRequired />
					<Button className='mt-4' label='Log in' type='submit' variant='primary' fullWidth />
					<Link to='forgot-password' className='mt-4 text-center text-blue-500'>
						I forgot my password
					</Link>
				</div>
			</form>

			<div className='mt-4 rounded-lg bg-white py-5 px-8 text-center '>
				<p>Don't have an account?</p>
				<Link to='register'>
					<Button
						className='mt-4'
						label='Sign up'
						type='submit'
						variant='outline'
						onClick={() => console.log('redirect to register')}
						fullWidth
					/>
				</Link>
			</div>
		</div>
	);
};

export default LoginRoute;
