'use client';

import { motion } from 'framer-motion';

interface Property {
	id: string;
	title: string;
	price: number;
	location: string;
	image: string;
}

export const PropertyCard = ({ property }: { property: Property }) => {
	return (
		<motion.div
			className='bg-[var(--secondary)] rounded overflow-hidden cursor-pointer hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]'
			whileHover={{ scale: 1.03 }}
			transition={{ duration: 0.3 }}
		>
			{/* IMAGE */}
			<div className='relative overflow-hidden'>
				<img
					src={property.image}
					alt={property.title}
					className='w-full h-[220px] object-cover transition duration-500 hover:scale-110'
				/>

				{/* overlay */}
				<div className='absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition' />

				{/* price */}
				<div className='absolute bottom-3 left-3 bg-[var(--gold)] text-black px-3 py-1 text-sm font-semibold'>
					${property.price.toLocaleString()}
				</div>
			</div>

			{/* CONTENT */}
			<div className='p-4'>
				<h3 className='text-lg font-semibold mb-1'>{property.title}</h3>

				<p className='text-gray-400 text-sm'>{property.location}</p>
			</div>
		</motion.div>
	);
};
