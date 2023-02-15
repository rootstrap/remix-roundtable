import { Outlet } from '@remix-run/react';

const Index = () => {
	return (
		<div>
			<main>
				{/* TODO: replace inline styles */}
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Index;
