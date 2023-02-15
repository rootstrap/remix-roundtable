import { Link, Outlet } from '@remix-run/react';

const Pokemons = () => {
	const pokemonsTypes = ['normal', 'fighting', 'flying', 'poison'];

	return (
		<div>
			<h3>Nested Routing</h3>
			<hr />
			<main>
				<div>
					{pokemonsTypes.map((pokemonType) => (
						<Link key={pokemonType} to={pokemonType} prefetch='intent'>
							<p>{pokemonType}</p>
						</Link>
					))}
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Pokemons;
