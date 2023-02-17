import type { ActionFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import fs from 'fs';

import pokemonList from '~/data/pokemon.json';

export const loader = async ({ params }: LoaderArgs) => {
	const filteredPokemon = pokemonList.pokemons.filter((pokemon) =>
		pokemon.types.includes(params.type as string)
	);
	return json({
		pokemons: filteredPokemon,
	});
};

export const action: ActionFunction = async ({ request }) => {
	if (request.method !== 'POST') return json({ error: 'Method not allowed' }, { status: 405 });

	const payload = await request.json();
	pokemonList.pokemons.push(payload);
	const pokemonListJson = JSON.stringify(pokemonList, null, 2);
	fs.writeFileSync('./app/data/pokemon.json', pokemonListJson, 'utf-8');

	return json({
		success: true,
		message: 'POSTed succesfully',
		pokemon: JSON.stringify(pokemonList.pokemons[pokemonList.pokemons.length], null, 2),
	});
};
