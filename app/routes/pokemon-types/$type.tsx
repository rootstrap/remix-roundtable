import { json } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';
import pokemonList from '~/data/pokemon.json';

export const loader = async ({ params }: LoaderArgs) => {
	const filteredPokemon = pokemonList.pokemons.filter((pokemon) =>
		pokemon.types.includes(params.type as string)
	);
	return json({
		pokemons: filteredPokemon,
	});
};

const PokemonPage = () => {
	const { pokemons } = useLoaderData<typeof loader>();

	return (
		<div>
			<h3>Pokemon Details</h3>
			<hr />
			{/* TODO: replace inline styles */}
			<main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
				{pokemons?.map(({ name, images }) => (
					<div key={name}>
						<p>Name: {name}</p>
						<img src={images.default} alt={name} />
					</div>
				))}
				<Outlet />
			</main>
		</div>
	);
};

export default PokemonPage;
