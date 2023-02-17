import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { PokeDetailsResponse } from '~/types/interfaces';
import sharedStyles from '~/styles/vanilla-css/shared.css';
import uniqueStyles from '~/styles/vanilla-css/unique.css';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

export const loader = async ({ params }: LoaderArgs) => {
	const pokeId = params.pokemonId;

	const res = await fetch(`${baseUrl}/${pokeId}`);
	const pokemonDetails = (await res.json()) as PokeDetailsResponse;

	return json({ name: pokemonDetails.name, types: pokemonDetails.types, id: pokeId });
};

// You can control which stylesheets are applied with a route-level granularity
export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: sharedStyles },
		{ rel: 'stylesheet', href: uniqueStyles },
	];
};

const PokemonPage = () => {
	const { name, types, id } = useLoaderData<typeof loader>();

	return (
		<div className='flex flex-col justify-center items-center'>
			<h3 className='mb-8'>Pokemon Details</h3>
			<main className='poke-grid-item'>
				<p>Name: {name}</p>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
					alt={name}
				/>
				<p>
					Types:{' '}
					{types.map(({ type }) => (
						<small key={type.name}> {type.name}</small>
					))}
				</p>
			</main>
		</div>
	);
};

export default PokemonPage;
