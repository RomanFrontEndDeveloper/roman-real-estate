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
import { getMe } from '@/entities/user/api/getMe';
import { Property } from '@/entities/property/types';

export default function PropertiesPage() {
	const router = useRouter();

	// =========================
	// 1. INPUT (що вводить користувач)
	// =========================
	const [inputCity, setInputCity] = useState('');
	const [inputMaxPrice, setInputMaxPrice] = useState('');

	// =========================
	// 2. FILTERS (що реально йде в API)
	// =========================
	const [city, setCity] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	// =========================
	// 3. PAGINATION + MODE
	// =========================
	const [page, setPage] = useState(1);
	const [showFavorites, setShowFavorites] = useState(false);

	// =========================
	// 4. USER
	// =========================
	const { data: user } = useQuery({
		queryKey: ['me'],
		queryFn: getMe,
		retry: false,
	});

	// =========================
	// 5. DEBOUNCE (затримка перед запитом)
	// =========================
	useEffect(() => {
		const timer = setTimeout(() => {
			setCity(inputCity);
			setMaxPrice(inputMaxPrice);
		}, 500);

		return () => clearTimeout(timer);
	}, [inputCity, inputMaxPrice]);

	// =========================
	// 6. RESET PAGE при зміні фільтрів
	// =========================
	useEffect(() => {
		setPage(1);
	}, [city, maxPrice]);

	// =========================
	// 7. SCROLL вверх при зміні сторінки
	// =========================
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [page]);

	// =========================
	// 8. FETCH DATA
	// =========================
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ['properties', page, city, maxPrice, showFavorites],
		queryFn: () => {
			const currentPage = showFavorites ? 1 : page;
			const limit = showFavorites ? 1000 : 3;

			return getProperties(currentPage, { city, maxPrice }, limit);
		},
		placeholderData: (prev) => prev,
	});

	// =========================
	// 9. FILTER FAVORITES
	// =========================
	const displayedProperties = useMemo(() => {
		if (!data?.data) return [];

		// якщо не favorites — просто показуємо все
		if (!showFavorites) return data.data;

		// якщо favorites — фільтруємо
		return data.data.filter((property) =>
			user?.favorites?.includes(property.id),
		);
	}, [data, showFavorites, user]);

	// =========================
	// 10. LOADING
	// =========================
	if (isLoading && !data) {
		return (
			<div className='grid grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, i) => (
					<PropertyCardSkeleton key={i} />
				))}
			</div>
		);
	}

	// =========================
	// 11. ERROR
	// =========================
	if (error) {
		return (
			<motion.div className='text-center mt-20'>
				<h2 className='text-2xl text-red-500'>Something went wrong</h2>
				<p className='text-gray-400'>Failed to load properties</p>
			</motion.div>
		);
	}

	// =========================
	// 12. UI
	// =========================
	return (
		<section>
			<h1 className='text-3xl font-bold mb-6 mt-4'>Properties</h1>

			{/* BUTTONS */}
			<div className='flex gap-3 mb-5 flex-wrap'>
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
						setShowFavorites(false);
					}}
				>
					Reset
				</Button>

				<Button
					variant='outline'
					disabled={isFetching}
					onClick={() => setShowFavorites((prev) => !prev)}
				>
					{showFavorites ? 'Show All' : 'Favorites ❤️'}
				</Button>
			</div>

			{/* FILTERS */}
			<div className='flex gap-4 mb-6'>
				<Input
					placeholder='City'
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

			{/* LIST */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{displayedProperties.length === 0 ? (
					<p className='text-center col-span-full text-gray-400'>
						{showFavorites
							? 'No favorite properties yet'
							: 'No properties found'}
					</p>
				) : (
					displayedProperties.map((property: Property) => (
						<PropertyCard key={property.id} property={property} />
					))
				)}
			</div>

			{/* PAGINATION */}
			{!showFavorites && (
				<div className='flex justify-center gap-4 mt-8'>
					<Button
						onClick={() => setPage((p) => Math.max(p - 1, 1))}
						disabled={page === 1 || isFetching}
					>
						Prev
					</Button>

					<span>
						Page {data?.page} of {data?.pages}
					</span>

					<Button
						onClick={() =>
							setPage((p) => (data && p < data.pages ? p + 1 : p))
						}
						disabled={page === data?.pages || isFetching}
					>
						Next
					</Button>
				</div>
			)}

			{/* LOADING INDICATOR */}
			{isFetching && (
				<p className='text-center mt-4 animate-pulse'>Updating...</p>
			)}
		</section>
	);
}
