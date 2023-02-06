type Product = {
	title: string;
	link: string;
	description: string;
};

const products: Product[] = [
	{
		title: 'Awesome Product',
		link: 'product1',
		description: 'this is the product 1',
	},
	{
		title: 'Bad Product',
		link: 'product2',
		description: 'this is the product 2',
	},
	{
		title: 'Good Product',
		link: 'product3',
		description: 'this is the product 3',
	},
];

export const fetchProducts = async (): Promise<Product[]> => {
	return Promise.resolve(products);
};

export const fetchProductDetails = async (productId: string): Promise<Product> => {
	const product = products.filter((prod) => prod.link === productId)[0];

	return Promise.resolve(product);
};
