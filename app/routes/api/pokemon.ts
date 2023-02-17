import fs from 'fs';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import pokemonList from '~/data/pokemon.json';

// GET
export const loader = () => {
	return json({
		pokemons: pokemonList,
	});
};

// POST, DELETE ...and the rest
export const action: ActionFunction = async ({ request }) => {
	switch (request.method) {
		case 'POST':
			return postPokemon(request);
		case 'DELETE':
			return deletePokemon(request);
		default:
			return json({ error: 'Method not allowed' }, { status: 405 });
	}
};

const postPokemon = async (request: Request) => {
	const payload = await request.json();
	if (!payload.name || !payload.types.length) {
		return json({ error: 'Missing required fields' }, { status: 400 });
	}

	pokemonList.pokemons.push(payload);
	const pokemonListJson = JSON.stringify(pokemonList, null, 2);
	fs.writeFileSync('./app/data/pokemon.json', pokemonListJson, 'utf-8');

	return json({
		success: true,
		message: 'POSTed succesfully',
		pokemon: JSON.stringify(pokemonList.pokemons[pokemonList.pokemons.length], null, 2),
	});
};

const deletePokemon = async (request: Request) => {
	const payload = await request.json();
	if (!payload.name) {
		return json({ error: 'Missing required fields' }, { status: 400 });
	}

	const pokemonIndex = pokemonList.pokemons.findIndex((pokemon) => pokemon.name === payload.name);
	if (pokemonIndex === -1) {
		return json({ error: 'Pokemon not found' }, { status: 404 });
	}

	pokemonList.pokemons.splice(pokemonIndex, 1);
	const pokemonListJson = JSON.stringify(pokemonList, null, 2);
	fs.writeFileSync('./app/data/pokemon.json', pokemonListJson, 'utf-8');

	return json({
		success: true,
		message: 'DELETEd succesfully',
	});
};
