'use client';

import { useQuery } from '@tanstack/react-query';
import { getProperties } from '@/entities/property/api/getProperties';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PropertyCardSkeleton } from '@/entities/property/ui/PropertyCardSkeleton';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PropertiesPage() {
	const router = useRouter();

	// 🔥 тільки input state
	const [inputCity, setInputCity] = useState('');
	const [inputMaxPrice, setInputMaxPrice] = useState('');

	// 🔥 debounce state (для запиту)
	const [city, setCity] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	// ⏳ debounce (ОДИН!)
	useEffect(() => {
		const timeout = setTimeout(() => {
			setCity(inputCity);
			setMaxPrice(inputMaxPrice);
		}, 500);

		return () => clearTimeout(timeout);
	}, [inputCity, inputMaxPrice]);

	// 🚀 запит
	const { data, isLoading, error } = useQuery({
		queryKey: ['properties', city, maxPrice],
		queryFn: () =>
			getProperties({
				city,
				maxPrice,
			}),
		placeholderData: (prev) => prev,
	});

	// 🔥 фільтр
	const filteredProperties = useMemo(() => {
		return data?.filter((property) => {
			const matchCity = property.location
				.toLowerCase()
				.includes(inputCity.trim().toLowerCase());

			const matchPrice =
				inputMaxPrice === '' || property.price <= Number(inputMaxPrice);

			return matchCity && matchPrice;
		});
	}, [data, inputCity, inputMaxPrice]);

	const text = 'No properties found';

	// ⏳ loading
	if (isLoading) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, i) => (
					<PropertyCardSkeleton key={i} />
				))}
			</div>
		);
	}

	// ❌ error
	if (error) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='flex flex-col items-center justify-center text-center mt-20'
			>
				<h2 className='text-2xl font-semibold text-red-500 mb-2'>
					Something went wrong
				</h2>

				<p className='text-gray-400 mb-6'>Failed to load properties</p>
			</motion.div>
		);
	}

	return (
		<section>
			<h1 className='text-3xl font-bold text-[var(--gold)] mb-6 mt-4 ml-3'>
				Properties
			</h1>

			{/* КНОПКИ */}
			<div className='flex gap-3 mb-5'>
				<Link href='/my-properties'>
					<Button variant='outline'>My Properties</Button>
				</Link>

				<Button
					variant='outline'
					onClick={() => router.push('/properties/create')}
				>
					+ Add Property
				</Button>

				<Button
					variant='outline'
					onClick={() => {
						setInputCity('');
						setInputMaxPrice('');
					}}
				>
					Reset
				</Button>
			</div>

			{/* ФІЛЬТРИ */}
			<div className='flex flex-col sm:flex-row gap-4 mb-6'>
				<Input
					placeholder='Сity ​​District'
					value={inputCity}
					onChange={(e) => setInputCity(e.target.value)}
				/>

				<Input
					type='number'
					placeholder='Max price'
					value={inputMaxPrice}
					onChange={(e) => setInputMaxPrice(e.target.value)}
				/>
			</div>

			{/* СПИСОК */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{filteredProperties?.length === 0 ? (
					<motion.div className='col-span-full text-center text-gray-400 py-10'>
						{text}
					</motion.div>
				) : (
					filteredProperties?.map((property) => (
						<motion.div
							key={property.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<PropertyCard property={property} />
						</motion.div>
					))
				)}
			</div>
		</section>
	);
}
