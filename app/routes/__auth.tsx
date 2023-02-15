import { Outlet } from '@remix-run/react';

const Auth = () => {
	return (
		<div className='bg-auth-background w-screen h-screen bg-cover'>
			<main className='px-8 pt-12'>
				<Outlet />
			</main>
		</div>
	);
};

export default Auth;
