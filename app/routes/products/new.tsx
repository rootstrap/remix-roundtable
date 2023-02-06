import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { createProduct } from '~/utils/productUtils';

export const action = async ({ request }: ActionArgs) => {
	const body = await request.formData();
	const title = body.get('title') as string;
	const description = body.get('description') as string;

	const success = await createProduct(title, description);
	return json({ ok: success });
};

const NewProduct = () => {
	const data = useActionData<typeof action>();
	console.log({ data });

	return (
		<form method='post'>
			<input type='text' name='title' defaultValue='' />
			<input type='text' name='description' defaultValue='' />
			<button type='submit'>Add Product</button>
		</form>
	);
};

export default NewProduct;
