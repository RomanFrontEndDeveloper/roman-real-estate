'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Property {
	id: string;
	title: string;
	price: number;
	location: string;
	image: string;
}

export const PropertyCard = ({ property }: { property: Property }) => {
	return (
		<Link href={`/properties/${property.id}`}>
			<motion.div
				className='bg-[var(--secondary)] rounded overflow-hidden cursor-pointer hover:shadow-[0_0_25px_rgba(201,169,110,0.2)] transition'
				whileHover={{ scale: 1.03 }}
				transition={{ duration: 0.3 }}
			>
				{/* IMAGE */}
				<div className='relative overflow-hidden'>
					<div className='relative w-full h-[220px] overflow-hidden'>
						<Image
							src={property.image}
							alt={property.title}
							fill
							className='object-cover transition duration-500 group-hover:scale-110'
							sizes='(max-width: 768px) 100vw, 33vw'
						/>
					</div>
					{/* overlay */}
					<div className='absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition duration-300' />
					{/* price */}
					<div className='absolute bottom-3 left-3 bg-[var(--gold)] text-black px-3 py-1 text-sm font-semibold'>
						${property.price.toLocaleString()}
					</div>
				</div>

				{/* CONTENT */}
				<div className='p-4'>
					<h3 className='text-lg font-semibold mb-1 hover:text-[var(--gold)] transition'>
						{property.title}
					</h3>

					<p className='text-gray-400 text-sm'>{property.location}</p>
				</div>
			</motion.div>
		</Link>
	);
};
