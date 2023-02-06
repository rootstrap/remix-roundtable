import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { fetchProducts } from '~/utils/fetchProducts';

export const loader = async () => {
	const products = await fetchProducts();

	return json({ products });
};

const Products = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>List of Products</h1>
			<hr />
			<ul>
				{data.products.map((product) => (
					<Link to={product.link} key={product.link}>
						<li>{product.title}</li>
					</Link>
				))}
			</ul>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Products;
