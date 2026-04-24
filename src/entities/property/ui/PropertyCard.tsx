'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Property } from '@/entities/property/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProperty } from '@/entities/property/api/deleteProperty';
import { toggleFavorite } from '@/entities/user/api/toggleFavorite';
import { getMe } from '@/entities/user/api/getMe';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ConfirmModal } from '@/shared/ui/src/shared/ui/ConfirmModal';

type Props = {
	property: Property;
};

export const PropertyCard = ({ property }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();
	const queryClient = useQueryClient();

	// 👤 user
	const { data: user } = useQuery({
		queryKey: ['me'],
		queryFn: getMe,
	});

	// ❤️ favorite check
	const isFavorite = user?.favorites?.includes(property.id);

	// 🗑 delete
	const deleteMutation = useMutation({
		mutationFn: deleteProperty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['properties'] });
			toast.success('Property deleted 🗑');
		},
		onError: () => {
			toast.error('Failed to delete');
		},
	});

	// ❤️ toggle favorite
	const favoriteMutation = useMutation({
		mutationFn: toggleFavorite,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['me'] });
			toast.success('Favorites updated ❤️');
		},
		onError: () => {
			toast.error('Error updating favorites');
		},
	});

	return (
		<Link href={`/properties/${property.id}`}>
			<motion.div
				className='group bg-[var(--secondary)] rounded overflow-hidden cursor-pointer hover:shadow-[0_0_25px_rgba(201,169,110,0.2)] transition'
				whileHover={{ scale: 1.04, y: -5 }}
				transition={{ duration: 0.3 }}
			>
				{/* IMAGE */}
				<div className='relative w-full h-[220px] overflow-hidden'>
					{property.images && property.images.length > 0 ? (
						<img
							src={`http://localhost:5000/${property.images[0]}`}
							className='w-full h-full object-cover'
							alt={property.title}
						/>
					) : (
						<img
							src='/no-image.png'
							className='w-full h-full object-cover'
							alt='no image'
						/>
					)}

					{/* ❤️ FAVORITE */}
					<Button
						disabled={favoriteMutation.isPending}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							favoriteMutation.mutate(property.id);
						}}
						className='absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded-lg'
					>
						{isFavorite ? '❤️' : '🤍'}
					</Button>
				</div>

				<div className='flex justify-between items-center m-2'>
					{/* LEFT */}
					<div className='flex flex-col gap-2 p-5'>
						<h3 className='text-lg font-semibold mb-1 hover:text-[var(--gold)] transition'>
							{property.title}
						</h3>

						<p className='text-[var(--gold)] font-semibold text-lg'>
							${property.price}
						</p>

						<p className='text-gray-400 text-sm'>
							{property.location}
						</p>
					</div>

					{/* RIGHT BUTTONS */}
					<div className='relative'>
						<div className='absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 w-[120px]'>
							{/* EDIT */}
							<Button
								variant='outline'
								className='w-full px-4 py-2 border border-gray-600 text-white rounded-xl bg-white/5 backdrop-blur-md hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-md'
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									router.push(
										`/properties/${property.id}/edit`,
									);
								}}
							>
								✏️ Edit
							</Button>

							{/* DELETE */}
							<Button
								variant='outline'
								disabled={deleteMutation.isPending}
								className='w-full px-4 py-2 border border-red-500/40 text-red-400 rounded-xl bg-red-500/10 backdrop-blur-md hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-md'
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();

									setIsOpen(true);
								}}
							>
								{deleteMutation.isPending
									? 'Deleting...'
									: '🗑 Delete'}
							</Button>
						</div>
					</div>
					<ConfirmModal
						isOpen={isOpen}
						onClose={() => setIsOpen(false)}
						onConfirm={() => {
							setIsOpen(false); // 🔥 ЗАКРИВАЄМО
							deleteMutation.mutate(property.id);
						}}
						title='Delete property?'
						description='This action cannot be undone.'
					/>
				</div>
			</motion.div>
		</Link>
	);
};
