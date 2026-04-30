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
					displayedProperties.map((property) => (
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

// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { getProperties } from '@/entities/property/api/getProperties';
// import { PropertyCard } from '@/entities/property/ui/PropertyCard';
// import { useState, useEffect, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { PropertyCardSkeleton } from '@/entities/property/ui/PropertyCardSkeleton';
// import { Input } from '@/shared/ui/Input';
// import { Button } from '@/shared/ui/Button';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { getMe } from '@/entities/user/api/getMe';

// export default function PropertiesPage() {
// 	const router = useRouter();

// 	// UI state
// 	const [inputCity, setInputCity] = useState('');
// 	const [inputMaxPrice, setInputMaxPrice] = useState('');

// 	// API state
// 	const [city, setCity] = useState('');
// 	const [maxPrice, setMaxPrice] = useState('');
// 	const [page, setPage] = useState(1);

// 	const [showFavorites, setShowFavorites] = useState(false);

// 	const { data: user } = useQuery({
// 		queryKey: ['me'],
// 		queryFn: getMe,
// 		retry: false,
// 	});

// 	// debounce
// 	useEffect(() => {
// 		const timeout = setTimeout(() => {
// 			setCity(inputCity);
// 			setMaxPrice(inputMaxPrice);
// 		}, 500);

// 		return () => clearTimeout(timeout);
// 	}, [inputCity, inputMaxPrice]);

// 	// reset page
// 	useEffect(() => {
// 		setPage(1);
// 	}, [city, maxPrice]);

// 	useEffect(() => {
// 		window.scrollTo({ top: 0, behavior: 'smooth' });
// 	}, [page]);

// 	// fetch
// 	const { data, isLoading, isFetching, error } = useQuery({
// 		queryKey: ['properties', page, city, maxPrice, showFavorites], // 👈 додали
// 		queryFn: () =>
// 			getProperties(
// 				showFavorites ? 1 : page, // 👈 якщо favorites → завжди 1 сторінка
// 				{
// 					city,
// 					maxPrice,
// 				},
// 				showFavorites ? 1000 : 3, // 👈 головне
// 			),
// 		placeholderData: (prev) => prev,
// 	});

// 	// 🔥 FILTER FAVORITES (ГОЛОВНЕ)
// 	const displayedProperties = useMemo(() => {
// 		if (!data?.data) return [];

// 		if (!showFavorites) return data.data;

// 		// 🔥 показуємо ВСІ favorites (без pagination)
// 		return data.data.filter((p) => user?.favorites?.includes(p.id));
// 	}, [data, showFavorites, user]);

// 	const text = 'No properties found';

// 	// loading
// 	if (isLoading && !data) {
// 		return (
// 			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
// 				{Array.from({ length: 6 }).map((_, i) => (
// 					<PropertyCardSkeleton key={i} />
// 				))}
// 			</div>
// 		);
// 	}

// 	// error
// 	if (error) {
// 		return (
// 			<motion.div
// 				initial={{ opacity: 0, y: 20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				className='flex flex-col items-center justify-center text-center mt-20'
// 			>
// 				<h2 className='text-2xl font-semibold text-red-500 mb-2'>
// 					Something went wrong
// 				</h2>

// 				<p className='text-gray-400 mb-6'>Failed to load properties</p>
// 			</motion.div>
// 		);
// 	}

// 	return (
// 		<section>
// 			<h1 className='text-3xl font-bold text-[var(--gold)] mb-6 mt-4 ml-3'>
// 				Properties
// 			</h1>

// 			{/* КНОПКИ */}
// 			<div className='flex gap-3 mb-5 flex-wrap'>
// 				<Link href='/my-properties'>
// 					<Button variant='outline'>My Properties</Button>
// 				</Link>

// 				<Button
// 					variant='outline'
// 					onClick={() => router.push('/properties/create')}
// 				>
// 					+ Add Property
// 				</Button>

// 				<Button
// 					variant='outline'
// 					onClick={() => {
// 						setInputCity('');
// 						setInputMaxPrice('');
// 						setCity('');
// 						setMaxPrice('');
// 						setPage(1);
// 						setShowFavorites(false);
// 					}}
// 				>
// 					Reset
// 				</Button>

// 				<Button
// 					variant='outline'
// 					disabled={isFetching} // 👈 ДОДАЙ
// 					onClick={() => setShowFavorites((prev) => !prev)}
// 					className={showFavorites ? 'bg-amber-950 text-black' : ''}
// 				>
// 					{showFavorites ? 'Show All' : 'Favorites ❤️'}
// 				</Button>
// 			</div>

// 			{/* ФІЛЬТРИ */}
// 			<div className='flex flex-col sm:flex-row gap-4 mb-6'>
// 				<Input
// 					placeholder='City - District'
// 					value={inputCity}
// 					onChange={(e) => setInputCity(e.target.value)}
// 				/>

// 				<Input
// 					type='number'
// 					placeholder='Max price'
// 					value={inputMaxPrice}
// 					onChange={(e) => setInputMaxPrice(e.target.value)}
// 				/>
// 			</div>

// 			{/* СПИСОК */}
// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
// 				{displayedProperties.length === 0 ? (
// 					<motion.div className='text-2xl col-span-full text-center rounded-2xl text-gray-400 py-10 shadow-[0_0_20px_rgba(201,169,110,0.4)]'>
// 						{showFavorites ? 'No favorite properties yet' : text}
// 					</motion.div>
// 				) : (
// 					displayedProperties.map((property) => (
// 						<motion.div
// 							key={property.id}
// 							initial={{ opacity: 0, y: 20 }}
// 							animate={{ opacity: 1, y: 0 }}
// 						>
// 							<PropertyCard property={property} />
// 						</motion.div>
// 					))
// 				)}
// 			</div>

// 			{/* PAGINATION */}
// 			{!showFavorites && (
// 				<div className='flex justify-center items-center gap-4 mt-8'>
// 					<Button
// 						variant='outline'
// 						onClick={() => setPage((p) => Math.max(p - 1, 1))}
// 						disabled={page === 1 || isFetching}
// 						className={`px-4 ${
// 							page === 1
// 								? 'opacity-30 cursor-not-allowed'
// 								: 'hover:bg-white/10'
// 						}`}
// 					>
// 						← Prev
// 					</Button>

// 					<span className='text-sm text-gray-400'>
// 						Page{' '}
// 						<span className='font-semibold text-white'>
// 							{data?.page}
// 						</span>{' '}
// 						of <span className='text-gray-300'>{data?.pages}</span>
// 					</span>

// 					<Button
// 						variant='outline'
// 						onClick={() =>
// 							setPage((p) => (data && p < data.pages ? p + 1 : p))
// 						}
// 						disabled={page === data?.pages || isFetching}
// 						className={`px-4 ${
// 							page === data?.pages
// 								? 'opacity-30 cursor-not-allowed'
// 								: 'hover:bg-white/10'
// 						}`}
// 					>
// 						Next →
// 					</Button>
// 				</div>
// 			)}

// 			{/* loading indicator */}
// 			{isFetching && (
// 				<p className='text-center text-[var(--gold)] mt-4 animate-pulse'>
// 					Updating...
// 				</p>
// 			)}
// 		</section>
// 	);
// }
