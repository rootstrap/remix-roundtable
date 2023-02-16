import { Link, Outlet, useParams } from '@remix-run/react';
import cn from 'classnames';

const Pokemons = () => {
	const pokemonsTypes = ['normal', 'fighting', 'flying', 'poison'];
	const { type } = useParams();

	return (
		<div className='p-8'>
			<h1 className='my-4 text-xl'>Nested Routing Example</h1>
			<hr />
			<main className=''>
				<div className='flex my-4'>
					{pokemonsTypes.map((pokemonType) => (
						<Link
							key={pokemonType}
							to={pokemonType}
							prefetch='intent'
							className={cn('mr-2 py-2 px-4 border border-cyan-800 text-black rounded-md', {
								'bg-cyan-800 text-white': type === pokemonType,
							})}
						>
							<p>{pokemonType}</p>
						</Link>
					))}
				</div>
				<Outlet />
			</main>
		</div>
	);
};

export default Pokemons;
