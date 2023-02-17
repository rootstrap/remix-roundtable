import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import cn from 'classnames';
import pokemonList from '~/data/pokemon.json';
import { useXRayMode } from '~/routes/pokemon-types';

export const loader = async ({ params }: LoaderArgs) => {
	const pokemon = pokemonList.pokemons.find((pokemon) => pokemon.name === params.pokemon);
	return json({ pokemon });
};

const PokemonDetail = () => {
	const { pokemon } = useLoaderData<typeof loader>();
	const navigate = useNavigate();

	const { xRayMode } = useXRayMode();

	return (
		<div
			className={cn('flex justify-center bg-cyan-50 relative border-l border-cyan-900', {
				'outline-4 -outline-offset-4 outline-dashed outline-lime-500 pattern-green': xRayMode,
			})}
		>
			<div className={cn('w-full', { grayscale: xRayMode })}>
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
		</div>
	);
};

export default PokemonDetail;
