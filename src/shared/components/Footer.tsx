import Link from 'next/link';

export const Footer = () => {
	const linkClass =
		'text-[var(--gray)] hover:text-[var(--gold)] transition-all duration-500 ease-out hover:drop-shadow-[0_0_14px_rgba(201,169,110,0.6)] hover:scale-[1.03] hover:tracking-[0.10em]';
	return (
		<footer className='border-t border-gray-800 mt-20'>
			<div className='max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* Лого */}
				<div>
					<div className='flex items-center gap-3'>
						<svg
							width='40'
							height='40'
							viewBox='0 0 100 100'
							className='transition duration-300 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(201,169,110,0.6)]'
						>
							{/* дах */}
							<path
								d='M20 50 L50 25 L80 50'
								stroke='var(--gold)'
								strokeWidth='3'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>

							{/* корпус */}
							<rect
								x='30'
								y='50'
								width='40'
								height='25'
								stroke='var(--gold)'
								strokeWidth='3'
								fill='none'
								rx='2'
							/>

							{/* двері */}
							<rect
								x='47'
								y='60'
								width='6'
								height='15'
								fill='var(--gold)'
								rx='1'
							/>
						</svg>

						<h2 className='text-xl font-semibold text-[var(--gold)] mb-0'>
							RomanRealEstate
						</h2>
					</div>
					<p className='text-gray-400 text-sm'>
						Premium real estate platform for luxury living.
					</p>
				</div>

				{/* Навігація */}
				<div>
					<h3 className='mb-3 text-white font-medium'>Navigation</h3>
					<ul className='space-y-2 text-gray-400 text-sm'>
						<li>
							<Link href='/' className={linkClass}>
								Home
							</Link>
						</li>
						<li>
							<Link href='/properties' className={linkClass}>
								Properties
							</Link>
						</li>
						<li>
							<Link href='/agents' className={linkClass}>
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
