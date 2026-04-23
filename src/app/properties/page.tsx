'use client';

import { useQuery } from '@tanstack/react-query';
import { getProperties } from '@/entities/property/api/getProperties';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PropertyCardSkeleton } from '@/entities/property/ui/PropertyCardSkeleton';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PropertiesPage() {
	const router = useRouter();

	// input state (для UI)
	const [inputCity, setInputCity] = useState('');
	const [inputMaxPrice, setInputMaxPrice] = useState('');

	// debounce state (для API)
	const [city, setCity] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const [page, setPage] = useState(1);

	// debounce
	useEffect(() => {
		const timeout = setTimeout(() => {
			setCity(inputCity);
			setMaxPrice(inputMaxPrice);
		}, 500);

		return () => clearTimeout(timeout);
	}, [inputCity, inputMaxPrice]);

	// reset page при зміні фільтрів
	useEffect(() => {
		setPage(1);
	}, [city, maxPrice]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [page]);

	// fetch
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ['properties', page, city, maxPrice],
		queryFn: () =>
			getProperties(page, {
				city,
				maxPrice,
			}),
		placeholderData: (prev) => prev,
	});

	const text = 'No properties found';

	// loading skeleton
	if (isLoading) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, i) => (
					<PropertyCardSkeleton key={i} />
				))}
			</div>
		);
	}

	// error
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
						setCity('');
						setMaxPrice('');
						setPage(1);
					}}
				>
					Reset
				</Button>
			</div>

			{/* ФІЛЬТРИ */}
			<div className='flex flex-col sm:flex-row gap-4 mb-6'>
				<Input
					placeholder='City / District'
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
				{data?.data?.length === 0 ? (
					<motion.div className='col-span-full text-center text-gray-400 py-10'>
						{text}
					</motion.div>
				) : (
					data?.data.map((property) => (
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

			{/* PAGINATION */}
			<div className='flex justify-center items-center gap-4 mt-8'>
				{/* Prev */}
				<Button
					variant='outline'
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					disabled={page === 1}
					className={`px-4 ${
						page === 1
							? 'opacity-30 cursor-not-allowed'
							: 'hover:bg-white/10'
					}`}
				>
					← Prev
				</Button>

				{/* Page info */}
				<span className='text-sm text-gray-400'>
					Page{' '}
					<span className='font-semibold text-white'>
						{data?.page}
					</span>{' '}
					of <span className='text-gray-300'>{data?.pages}</span>
				</span>

				{/* Next */}
				<Button
					variant='outline'
					onClick={() =>
						setPage((p) => (data && p < data.pages ? p + 1 : p))
					}
					disabled={page === data?.pages}
					className={`px-4 ${
						page === data?.pages
							? 'opacity-30 cursor-not-allowed'
							: 'hover:bg-white/10'
					}`}
				>
					Next →
				</Button>
			</div>

			{/* subtle loading indicator */}
			{isFetching && (
				<p className='text-center text-gray-400 mt-4'>Loading...</p>
			)}
		</section>
	);
}
