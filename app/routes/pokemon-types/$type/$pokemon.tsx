import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import pokemonList from '~/data/pokemon.json';

export const loader = async ({ params }: LoaderArgs) => {
	const pokemon = pokemonList.pokemons.find((pokemon) => pokemon.name === params.pokemon);
	return json({ pokemon });
};

const FetchData = () => {
	const { pokemon } = useLoaderData<typeof loader>();
	const navigate = useNavigate();

	return (
		<div className='flex justify-center bg-cyan-50 relative border-l border-cyan-900'>
			<button className='absolute right-4 top-4 text-white' onClick={() => navigate('../')}>
				Close
			</button>
			<div className='flex items-center flex-col w-full'>
				<div className='bg-cyan-900 text-white w-full'>
					<h3 className='text-lg font-bold text-center py-4'>{pokemon?.name}</h3>
				</div>
				<div className='p-8'>
					<img src={pokemon?.images.artwork} alt={pokemon?.name} />
				</div>
				<div className='mb-8'>
					{pokemon?.types.map((type) => (
						<span
							key={type}
							className='inline-block bg-cyan-900 text-white rounded-full px-4 py-2 text-md mr-2'
						>
							{type}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default FetchData;
