import { json } from '@remix-run/node';
import type { LoaderArgs, LinksFunction } from '@remix-run/node';
import { useLoaderData, Outlet, Link, useParams } from '@remix-run/react';
import cn from 'classnames';
import pokemonList from '~/data/pokemon.json';
import unrevealedSquirtle from '~/images/squirtle.png';
import { useXRayMode } from '../pokemon-types';
import sharedStyles from '~/styles/vanilla-css/shared.css';

export const loader = async ({ params }: LoaderArgs) => {
	const filteredPokemon = pokemonList.pokemons.filter((pokemon) =>
		pokemon.types.includes(params.type as string)
	);
	return json({
		pokemons: filteredPokemon,
	});
};

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: sharedStyles }];
};

const PokemonGrid = () => {
	const { type: selectedType = '', pokemon: selectedPokemon } = useParams();
	const { pokemons } = useLoaderData<typeof loader>();
	const { xRayMode } = useXRayMode();

	const capitalizedType = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

	return (
		<div className='bg-cyan-50'>
			<div
				className={cn('grid border border-cyan-900 rounded-lg overflow-hidden', {
					'grid-cols-2': selectedPokemon,
					'outline-4 outline-dotted outline-red-500 pattern-red': xRayMode,
				})}
			>
				<div className={cn({ grayscale: xRayMode })}>
					<div className='bg-cyan-800 text-white'>
						<h2 className='text-lg font-bold text-center py-4'>{capitalizedType} Pokemon</h2>
					</div>
					<div className={cn('py-4 px-2 grid grid-cols-6', { 'grid-cols-4': selectedPokemon })}>
						{pokemons?.map(({ name, images }) => (
							<Link
								key={name}
								to={name}
								prefetch='intent'
								className='poke-grid-item'
								preventScrollReset
							>
								<img src={images?.default || unrevealedSquirtle} alt={name} />
								<p className='font-extralight'>{name}</p>
							</Link>
						))}
					</div>
				</div>
				<Outlet context={{ xRayMode }} />
			</div>
		</div>
	);
};

export default PokemonGrid;
