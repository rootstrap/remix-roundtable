import type { LinksFunction } from '@remix-run/node';
import styles from '~/styles/index.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

const Root = () => {
	return (
		<header className='header'>
			<h1>This is the route we should see at /</h1>
		</header>
	);
};

export default Root;
