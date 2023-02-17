import type { LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import sharedStyles from '~/styles/vanilla-css/shared.css';

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

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: sharedStyles }];
};

const FetchData = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h3>Poke Api</h3>
			<hr />
			<main>
				<div className='poke-grid'>
					{data.pokemons.map((pokemon, index) => (
						<div className='poke-grid-item' key={pokemon.url}>
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
