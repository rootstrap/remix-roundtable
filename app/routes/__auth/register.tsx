import type { ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useTransition } from '@remix-run/react';
import { Button, InputField, ValidationMessage } from '~/components';
import logo from '~/images/Logo.png';

enum FormFields {
	email = 'email',
	password1 = 'password1',
	password2 = 'password2',
}

type RegisterResponse = {
	detail?: string;
	email?: string[];
	password1?: string[];
	non_field_errors?: string[];
};

const registerApiUrl = 'https://black-market-juan-rs.herokuapp.com/dj-rest-auth/registration/';

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const email = body.get(FormFields.email);
	const password1 = body.get(FormFields.password1);
	const password2 = body.get(FormFields.password2);

	const response = (await (
		await fetch(registerApiUrl, {
			method: 'post',
			body: JSON.stringify({ email, password1, password2 }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	).json()) as unknown as RegisterResponse;

	if (response.detail) return redirect('/confirmation');

	return json({ response });
};

const RegisterRoute = () => {
	const transition = useTransition();
	const actionData = useActionData();
	const errors = actionData?.response || {};

	const isButtonDisabled = transition.state === 'loading' || transition.state === 'submitting';
	const buttonLabel = isButtonDisabled ? 'Submiting...' : 'Sign up';

	console.log({ errors });

	return (
		<div id='register-page' className='md:max-w-authForms'>
			<Form method='post' className='rounded-lg bg-white px-8 pb-6 pt-10'>
				<div className='flex w-full justify-center'>
					<img src={logo} alt='blackmarket' />
				</div>

				<div className='mt-9 flex flex-col'>
					<InputField label='Email' name={FormFields.email} isRequired type='email' />
					<InputField label='Password' name={FormFields.password1} isRequired type='password' />
					<InputField
						label='Password Confirmation'
						name={FormFields.password2}
						isRequired
						type='password'
					/>

					{Object.keys(errors).map((errorField) => (
						<div className='mb-2' key={errorField}>
							<ValidationMessage
								error={errors[errorField][0]}
								isSubmitting={transition.state === 'submitting'}
							/>
						</div>
					))}

					<Button
						className='mt-4'
						label={buttonLabel}
						type='submit'
						variant='primary'
						disabled={isButtonDisabled}
						fullWidth
					/>

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
			</Form>
		</div>
	);
};

export default RegisterRoute;
