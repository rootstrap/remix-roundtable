import type { ActionFunction, ErrorBoundaryComponent, LoaderArgs } from '@remix-run/node';
import { Response } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useCatch, useLoaderData, useNavigate } from '@remix-run/react';
import cn from 'classnames';
import pokemonList from '~/data/pokemon.json';
import { useXRayMode } from '~/routes/pokemon-types';

export const loader = async ({ params }: LoaderArgs) => {
	const pokemon = pokemonList.pokemons.find((pokemon) => pokemon.name === params.pokemon);
	return json({ pokemon });
};

export const action: ActionFunction = async () => {
	throw new Response('Could not catch pokemon because of reasons', { status: 500 });
};

const PokemonDetail = () => {
	const { pokemon } = useLoaderData<typeof loader>();
	const navigate = useNavigate();

	const { xRayMode } = useXRayMode();

	return (
		<div
			className={cn('flex justify-center bg-cyan-50 relative border-l border-cyan-900', {
				'outline-4 -outline-offset-4 outline-dotted outline-lime-500 pattern-green': xRayMode,
			})}
		>
			<div className={cn('w-full', { grayscale: xRayMode })}>
				<button className='absolute right-4 top-4 text-white' onClick={() => navigate('../')}>
					Close
				</button>
				<div className='flex items-center flex-col w-full'>
					<div className='bg-cyan-900 text-white w-full'>
						<h3 className='text-lg font-bold text-center py-4'>{pokemon?.name}</h3>
					</div>
					<div className='p-8'>
						{/* Will fail when `images` is `undefined` */}
						<img src={pokemon?.images.artwork} alt={pokemon?.name} />
					</div>
					<div className='mb-8'>
						{pokemon?.types.map((type) => (
							<span
								key={type}
								className='inline-block bg-cyan-900 text-white rounded-full px-4 py-2 text-md mr-2'
							>
								{type}
							</span>
						))}
					</div>
					<Form method='post' className='mt-12'>
						<button
							className='mr-2 mb-10 py-2 px-4 border border-rose-600 text-rose-600 rounded-md'
							type='submit'
						>
							Catch! (and fail)
						</button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export function CatchBoundary() {
	const navigate = useNavigate();
	const caught = useCatch();

	return (
		<div className='w-full h-full bg-rose-200 text-white relative flex flex-col'>
			<button className='absolute right-4 top-4 text-white' onClick={() => navigate('../')}>
				Close
			</button>
			<div className='flex items-center flex-col w-full bg-red-500'>
				<h3 className='text-lg font-bold text-center py-4'>Catch Boundary</h3>
			</div>
			<div className='flex flex-col items-center justify-center h-full'>
				<code className='text-lg font-extralight text-center py-4 text-rose-600'>
					{JSON.stringify(caught, null, 2)}
				</code>
				<p className='text-rose-600 mt-12'>
					TIP: Used for <strong>EXPECTED</strong> errors and validations
				</p>
			</div>
		</div>
	);
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	const navigate = useNavigate();
	return (
		<div className='w-full h-full bg-rose-200 text-white relative flex flex-col'>
			<button className='absolute right-4 top-4 text-white' onClick={() => navigate('../')}>
				Close
			</button>
			<div className='flex items-center flex-col w-full bg-red-500'>
				<h3 className='text-lg font-bold text-center py-4'>Error Boundary</h3>
			</div>
			<div className='flex flex-col items-center justify-center h-full'>
				<code className='text-lg font-extralight text-center py-4 text-rose-600'>
					{JSON.stringify(error.message, null, 2)}
				</code>
				<p className='text-rose-600 mt-12'>
					TIP: Used for <strong>UNEXPECTED</strong> errors
				</p>
			</div>
		</div>
	);
};

export default PokemonDetail;
