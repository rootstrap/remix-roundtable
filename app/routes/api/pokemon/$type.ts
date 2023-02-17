import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

import pokemonList from '~/data/pokemon.json';

// /api/pokemon/:type?limit=:limit
export const loader = async ({ params, request }: LoaderArgs) => {
	const url = new URL(request.url);
	const limit = url.searchParams.get('limit');

	const filteredPokemon = pokemonList.pokemons.filter((pokemon) =>
		pokemon.types.includes(params.type as string)
	);

	const pokemons = limit ? filteredPokemon.slice(0, Number(limit)) : filteredPokemon;

	console.log('params', limit);
	return json({ pokemons });
};
