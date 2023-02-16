import type {
	LoaderFunction,
	LoaderArgs,
	MetaFunction,
	ErrorBoundaryComponent,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUserSession } from '~/session.server';
import logo from '~/images/Logo.png';

const getProductsApi = 'https://black-market-juan-rs.herokuapp.com/api/products';

type Product = {
	id: number;
	is_favorite: boolean;
	name: string;
	product_picture: string;
	categories: { id: number; name: string }[];
};

type GetProductsResponse = {
	count: number;
	next: boolean | null;
	previous: boolean | null;
	results: Product[];
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
	const session = await getUserSession(request);
	const { access_token } = session.data as { access_token: string };

	const response = await (
		await fetch(getProductsApi, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
	).json();

	return response;
};

const ProductsPage = () => {
	const data = useLoaderData() as GetProductsResponse;

	return (
		<div className='bg-gray-50 h-screen'>
			<nav className='flex p-4 bg-gray-400'>
				<img src={logo} alt='blackmarket' />
			</nav>
			<hr />

			<h3 className='text-center p-4 mt-2 text-lg'>Explore Products</h3>

			<div className='mt-8 border-1 border-gray-700 rounded-lg mx-4 bg-white overflow-hidden'>
				{data.results.map((product) => (
					<div key={product.id} className='border-b-1 border-gray-700 flex'>
						<div className='w-1/4 h-[120px] p-2'>
							<img src={product.product_picture} alt={product.name} className='w-full h-full' />
						</div>
						<div className='flex flex-col justify-center p-2'>
							<h3>{product.name}</h3>
							<p>{product.categories[0].name}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export const ErrorBoundary: ErrorBoundaryComponent = () => {
	return (
		<div className='bg-gray-50 h-screen'>
			<nav className='flex p-4 bg-gray-400'>
				<img src={logo} alt='blackmarket' />
			</nav>
			<hr />

			<h3 className='text-center p-4 mt-2 text-lg'>Explore Products</h3>

			<div className='mt-8 border-1 border-gray-700 rounded-lg mx-4 bg-white overflow-hidden'>
				<p className='p-4 bg-red-50 text-center border-red-900'>
					Service not available at this moment
				</p>
			</div>
		</div>
	);
};

export const meta: MetaFunction = () => {
	return {
		title: 'BlackMarket Products',
		description: 'Explore our products',
	};
};

export default ProductsPage;
