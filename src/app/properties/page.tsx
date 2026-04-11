'use client';

import { useQuery } from '@tanstack/react-query';
import { getProperties } from '@/entities/property/api/getProperties';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PropertiesPage() {
	const [city, setCity] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	const { data, isLoading, error } = useQuery({
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
			<div className='text-white flex justify-center mt-5'>
				Loading...
			</div>
		);
	}

	if (error) {
		return <div className='text-red-500'>Error loading properties</div>;
	}

	return (
		<section>
			<h1 className='text-3xl font-bold text-[var(--gold)] mb-6 mt-4 ml-3'>
				Properties
			</h1>

			<div className='flex flex-col sm:flex-row gap-4 mb-6'>
				{/* CITY */}
				<input
					type='text'
					placeholder='City (Kyiv, Lviv...)'
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className='px-4 py-2 bg-[var(--secondary)] focus:outline-none focus:border-[var(--gold)] border border-gray-700 text-white rounded w-full sm:w-[200px] max-w-[220px] focus:shadow-[0_0_8px_rgba(201,169,110,0.4)]'
				/>

				{/* PRICE */}
				<input
					type='number'
					placeholder='Max price'
					value={maxPrice}
					onChange={(e) => setMaxPrice(e.target.value)}
					className='px-4 py-2 bg-[var(--secondary)] focus:outline-none focus:border-[var(--gold)] focus:shadow-[0_0_8px_rgba(201,169,110,0.4)] border border-gray-700 text-white rounded w-full sm:w-[200px] max-w-[220px]'
				/>
				<div className='flex items-center ml-2'>
					<button
						onClick={() => {
							setCity('');
							setMaxPrice('');
						}}
						className='
		            flex items-center justify-center gap-2
		            px-4 py-2
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
