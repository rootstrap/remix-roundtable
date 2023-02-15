import type { ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useTransition } from '@remix-run/react';
import { Button, InputField, ValidationMessage } from '~/components';
import logo from '~/images/Logo.png';

enum FormFields {
	email = 'email',
	password = 'password',
}

type User = {
	email: string;
	first_name: string;
	last_name: string;
	pk: number;
};

type LoginResponse = {
	non_field_errors: string[];
	access_token: string;
	refresh_token: string;
	user: User;
};

const loginApiUrl = 'https://black-market-juan-rs.herokuapp.com/dj-rest-auth/login/';

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const email = body.get(FormFields.email);
	const password = body.get(FormFields.password);

	const response = (await (
		await fetch(loginApiUrl, {
			method: 'post',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	).json()) as unknown as LoginResponse;

	if (response.non_field_errors) {
		return json({ error: response.non_field_errors });
	}

	/* TODO: store session in cookies, show response in server logs */

	console.log({ response });
	return redirect('/products');
};

const LoginRoute = () => {
	const transition = useTransition();
	const actionData = useActionData<typeof action>();
	const errors = actionData?.error || [];

	const isButtonDisabled = transition.state === 'loading' || transition.state === 'submitting';
	const buttonLabel = isButtonDisabled ? 'Submiting...' : 'Log in';

	return (
		<div id='login-page' className='md:max-w-authForms'>
			<Form method='post' className='rounded-lg bg-white px-8 pt-10 pb-6'>
				<div className='flex w-full justify-center'>
					<img src={logo} alt='blackmarket' />
				</div>

				<div className='mt-8 flex flex-col'>
					<InputField label='Email' name={FormFields.email} isRequired type='email' />
					<InputField label='Password' name={FormFields.password} type='password' isRequired />
					<Button
						className='mt-4'
						label={buttonLabel}
						type='submit'
						variant='primary'
						fullWidth
						disabled={isButtonDisabled}
					/>

					<ValidationMessage error={errors[0]} isSubmitting={transition.state === 'submitting'} />

					<Link to='forgot-password' className='mt-4 text-center text-blue-500'>
						I forgot my password
					</Link>
				</div>
			</Form>

			<div className='mt-4 rounded-lg bg-white py-5 px-8 text-center '>
				<p>Don't have an account?</p>
				<Link to='register'>
					<Button className='mt-4' label='Sign up' variant='outline' fullWidth />
				</Link>
			</div>
		</div>
	);
};

export default LoginRoute;
