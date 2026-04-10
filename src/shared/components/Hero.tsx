'use client';

import { motion } from 'framer-motion';

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
				<motion.div
					initial='hidden'
					animate='visible'
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.3,
							},
						},
					}}
				>
					{/* TITLE */}
					<motion.h1
						className='text-5xl md:text-6xl font-bold text-[var(--gold)] mb-4'
						variants={{
							hidden: { opacity: 0, y: 40 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.8 }}
					>
						Find Your Dream <br /> Property
					</motion.h1>

					{/* TEXT */}
					<motion.p
						className='text-gray-300 max-w-xl mb-6'
						variants={{
							hidden: { opacity: 0, y: 40 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.8 }}
					>
						Exclusive luxury real estate with premium locations and
						modern design
					</motion.p>

					{/* BUTTON */}
					<motion.button
						className='bg-[var(--gold)] text-black px-6 py-3 rounded hover:opacity-80 transition'
						variants={{
							hidden: { opacity: 0, y: 40 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.8 }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						View Properties
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
};
