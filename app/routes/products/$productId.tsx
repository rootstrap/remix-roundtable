import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { fetchProductDetails } from '~/utils/productUtils';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ params }: LoaderArgs) => {
	const product = await fetchProductDetails(params.productId!);
	return json({ title: product.title, description: product.description });
};

const Product = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h3>{data.title}</h3>
			<p>{data.description}</p>
		</div>
	);
};

export default Product;
