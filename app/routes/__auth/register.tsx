import { Link } from '@remix-run/react';
import { Button, InputField } from '~/components';
import logo from '~/images/Logo.png';

enum FormFields {
	email = 'email',
	fullname = 'fullname',
	password = 'password',
}

const RegisterRoute = () => {
	return (
		<div id='register-page' className='md:max-w-authForms'>
			<form action='/auth/signin' className='rounded-lg bg-white px-8 pb-6 pt-10'>
				<div className='flex w-full justify-center'>
					<img src={logo} alt='blackmarket' />
				</div>

				<div className='mt-9 flex flex-col'>
					<InputField label='Email' name={FormFields.email} isRequired type='email' />
					<InputField label='FullName' name={FormFields.fullname} isRequired type='text' />
					<InputField label='Password' name={FormFields.password} isRequired type='password' />

					<Button className='mt-4' label='Sign up' type='submit' variant='primary' fullWidth />

					<p className='mt-4 text-center'>
						By signing up, you accept the Data Policy and the Cookies Policy.
					</p>

					<p className='mt-4 text-center'>
						Already have an account?{' '}
						<Link to='/' className='text-blue-500'>
							Log in
						</Link>{' '}
					</p>
				</div>
			</form>
		</div>
	);
};

export default RegisterRoute;
