'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const Hero = () => {
	const title = 'Find Your Dream Property';
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
			<div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent pointer-events-none' />

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
						className='
		            text-5xl 
		            font-bold text-[var(--gold)]
		            mb-4
		            max-w-[700px]
		            leading-tight
	            '
						initial='hidden'
						animate='visible'
					>
						{title.split(' ').map((word, index) => (
							<motion.span
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: index * 0.2,
									duration: 0.6,
									ease: 'easeInOut',
									repeat: 3,
									repeatDelay: 1,
								}}
								className='inline-block mr-2'
							>
								{word}
							</motion.span>
						))}
					</motion.h1>
					{/* TEXT */}
					<motion.p
						className='text-[var(--gray)] max-w-xl mb-6'
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
					<Link href='/properties'>
						<motion.button
							className='bg-[var(--gold)] text-black px-6 py-3 rounded hover:scale-104 ease-linear transition'
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
					</Link>
				</motion.div>
			</div>
		</section>
	);
};
