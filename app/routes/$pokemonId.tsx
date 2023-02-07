import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { PokeDetailsResponse } from '~/types/interfaces';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

export const loader = async ({ params }: LoaderArgs) => {
	const pokeId = params.pokemonId;

	const res = await fetch(`${baseUrl}/${pokeId}`);
	const pokemonDetails = (await res.json()) as PokeDetailsResponse;

	return json({ name: pokemonDetails.name, types: pokemonDetails.types, id: pokeId });
};

const PokemonPage = () => {
	const { name, types, id } = useLoaderData<typeof loader>();

	return (
		<div>
			<h3>Pokemon Details</h3>
			<hr />
			<main>
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
