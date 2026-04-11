'use client';

import { useQuery } from '@tanstack/react-query';
import { getProperties } from '@/entities/property/api/getProperties';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PropertyCardSkeleton } from '@/entities/property/ui/PropertyCardSkeleton';

export default function PropertiesPage() {
	const [city, setCity] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['properties'],
		queryFn: getProperties,
	});

	const filteredProperties = data?.filter((property) => {
		const matchCity = property.location
			.toLowerCase()
			.includes(city.toLowerCase());

		const matchPrice =
			maxPrice === '' || property.price <= Number(maxPrice);

		return matchCity && matchPrice;
	});

	const text = 'No properties found';

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, i) => (
					<PropertyCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (error) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='flex flex-col items-center justify-center text-center mt-25 mb-25'
			>
				<h2 className='text-2xl font-semibold text-red-500 mb-2'>
					Something went wrong
				</h2>

				<p className='text-gray-400 mb-6'>
					Failed to load properties. Please try again.
				</p>

				<button
					onClick={() => refetch()}
					className='
          px-6 py-2
          rounded-lg
          bg-[var(--gold)]
          transition-all duration-300
          hover:shadow-[0_0_12px_rgba(201,169,110,0.6)]
          active:scale-95
        '
				>
					Retry
				</button>
			</motion.div>
		);
	}

	return (
		<section>
			<h1 className='text-3xl font-bold text-[var(--gold)] mb-6 mt-4 ml-3'>
				Properties
			</h1>

			<div className='flex items-center flex-col sm:flex-row gap-4 mb-6'>
				{/* CITY */}
				<input
					type='text'
					placeholder='City (Kyiv, Lviv...)'
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className='px-4 py-2 bg-[var(--secondary)] focus:outline-none focus:border-[var(--gold)] border border-gray-700 text-white rounded w-full sm:w-[220px] max-w-[250px] focus:shadow-[0_0_8px_rgba(201,169,110,0.4)]'
				/>

				{/* PRICE */}
				<input
					type='number'
					placeholder='Max price'
					value={maxPrice}
					onChange={(e) => setMaxPrice(e.target.value)}
					className='px-4 py-2 bg-[var(--secondary)] focus:outline-none focus:border-[var(--gold)] focus:shadow-[0_0_8px_rgba(201,169,110,0.4)] border border-gray-700 text-white rounded w-full sm:w-[220px] max-w-[250px]'
				/>
				<div className='flex items-center ml-2'>
					<button
						onClick={() => {
							setCity('');
							setMaxPrice('');
						}}
						className='
		            flex items-center justify-center gap-2
		            px-8 py-2.5
	              rounded-lg
		            bg-transparent
		            border border-gray-700
	            	text-gray-400 text-sm
		            whitespace-nowrap

		            transition-all duration-300

		            hover:border-[var(--gold)]
		            hover:text-[var(--gold)]
		            hover:shadow-[0_0_8px_rgba(201,169,110,0.4)]
                
		            active:scale-95
	            '
					>
						Reset
					</button>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{filteredProperties?.length === 0 ? (
					<motion.div
						className='col-span-full text-center rounded-2xl text-gray-400 py-10 shadow-[0_0_20px_rgba(201,169,110,0.4)]'
						initial='hidden'
						animate='visible'
					>
						{text.split('').map((char, index) => (
							<motion.span
								className='text-2xl	'
								key={index}
								variants={{
									hidden: { opacity: 0 },
									visible: { opacity: 1 },
								}}
								transition={{
									delay: index * 0.15,
								}}
							>
								{char}
							</motion.span>
						))}
					</motion.div>
				) : (
					filteredProperties?.map((property) => (
						<PropertyCard key={property.id} property={property} />
					))
				)}
			</div>
		</section>
	);
}
