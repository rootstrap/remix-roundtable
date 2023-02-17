import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from '~/styles/tailwind.generated.css';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'JS Roundtable - Remix',
	viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

const App = () => {
	return (
		<html lang='en'>
			<head>
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
};

export default App;
