import { useState } from 'react';
import { Link, Outlet, useOutletContext, useParams } from '@remix-run/react';
import cn from 'classnames';

const pokemonsTypes = ['normal', 'fighting', 'flying', 'poison'];

const Pokedex = () => {
	const { type } = useParams();
	const [xRayMode, setXRayMode] = useState(false);

	return (
		<div
			className={cn('p-8', {
				'outline-4 -outline-offset-4 outline-dotted outline-blue-500 pattern-blue': xRayMode,
			})}
		>
			<div className='flex justify-between items-center'>
				<h1 className='my-4 text-xl'>Nested Routing Example</h1>
				<div className='grid grid-cols-2 gap-4'>
					<button onClick={() => setXRayMode(!xRayMode)}>X Ray</button>
					<Link className='' to='/pokemon-types'>
						Reset
					</Link>
				</div>
			</div>
			<hr />
			<div className={cn('flex my-4', { grayscale: xRayMode })}>
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
			<Outlet context={{ xRayMode }} />
		</div>
	);
};

export const useXRayMode = () => {
	return useOutletContext<{ xRayMode: boolean }>();
};

export default Pokedex;
