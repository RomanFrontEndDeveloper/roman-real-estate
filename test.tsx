'use client';

export const Hero = () => {
	return (
		<section
			className='relative h-[80vh] flex items-center overflow-hidden'
			style={{
				backgroundImage: 'url(/images/hero.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			{/* overlay */}
			<div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent pointer-events-none' />

			<div className='relative z-10 container'>
				{/* TITLE */}
				<h1 className='text-5xl md:text-6xl font-bold text-[var(--gold)] mb-4 animate-fade-up'>
					Find Your Dream <br /> Property
				</h1>

				{/* TEXT */}
				<p className='text-[var(--gray)] max-w-xl mb-6 animate-fade-up delay-150'>
					Exclusive luxury real estate with premium locations and
					modern design
				</p>

				{/* BUTTON */}
				<button className='bg-[var(--gold)] text-black px-6 py-3 rounded hover:opacity-80 transition duration-300 hover:scale-105'>
					View Properties
				</button>
			</div>
		</section>
	);
};
