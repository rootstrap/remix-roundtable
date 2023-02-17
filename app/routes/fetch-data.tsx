import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

type PokeResults = {
	name: string;
	url: string;
};

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

export const loader = async () => {
	const res = await fetch(baseUrl);
	const pokemons = (await res.json()) as { results: PokeResults[] };

	return json({ pokemons: pokemons.results });
};

const FetchData = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h3>Poke Api</h3>
			<hr />
			<main>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
					{data.pokemons.map((pokemon, index) => (
						<div key={pokemon.url}>
							<Link to={`/${index + 1}`} prefetch='intent'>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
										index + 1
									}.png`}
									alt={pokemon.name}
								/>
							</Link>
							<p>{pokemon.name}</p>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default FetchData;
