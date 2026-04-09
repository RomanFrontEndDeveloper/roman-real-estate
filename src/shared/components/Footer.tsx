import Link from 'next/link';

export const Footer = () => {
	return (
		<footer className='border-t border-gray-800 mt-20'>
			<div className='max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* Лого */}
				<div>
					<h2 className='text-xl font-semibold text-(--gold) mb-3'>
						RomanRealEstate
					</h2>
					<p className='text-gray-400 text-sm'>
						Premium real estate platform for luxury living.
					</p>
				</div>

				{/* Навігація */}
				<div>
					<h3 className='mb-3 text-white font-medium'>Navigation</h3>
					<ul className='space-y-2 text-gray-400 text-sm'>
						<li>
							<Link
								href='/'
								className='hover:text-(--gold) transition'
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href='/properties'
								className='hover:text-(--gold) transition'
							>
								Properties
							</Link>
						</li>
						<li>
							<Link
								href='/agents'
								className='hover:text-(--gold) transition'
							>
								Agents
							</Link>
						</li>
					</ul>
				</div>

				{/* Контакти */}
				<div>
					<h3 className='mb-3 text-white font-medium'>Contact</h3>
					<p className='text-gray-400 text-sm'>
						Email: roman168234@gmail.com
					</p>
					<p className='text-gray-400 text-sm'>
						Phone: +38 097 064 76 62
					</p>
				</div>
			</div>

			<div className='border-t border-gray-800 text-center py-4 text-gray-500 text-sm'>
				© {new Date().getFullYear()} RomanRealEstate. All rights
				reserved.
			</div>
		</footer>
	);
};
