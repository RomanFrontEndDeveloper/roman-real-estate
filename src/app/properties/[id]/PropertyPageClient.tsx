'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getPropertyById } from '@/entities/property/api/getPropertyById';
import { deleteProperty } from '@/entities/property/api/deleteProperty';
import { Button } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/src/shared/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function PropertyPageClient({ id }) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const propertyId = Array.isArray(id) ? id[0] : id;

	const [isDeleted, setIsDeleted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// 🔥 GET PROPERTY
	const { data: property, isLoading } = useQuery({
		queryKey: ['property', propertyId],
		queryFn: () => getPropertyById(propertyId as string),
		retry: false,
		enabled: !!propertyId && !isDeleted,
	});

	// 🔥 DELETE
	const deleteMutation = useMutation({
		mutationFn: deleteProperty,
		onSuccess: () => {
			setIsDeleted(true);

			toast.success('Property deleted 🗑');

			queryClient.invalidateQueries({ queryKey: ['properties'] });

			queryClient.removeQueries({
				queryKey: ['property', propertyId],
			});

			router.push('/properties');
		},
		onError: () => {
			toast.error('Failed to delete ❌');
		},
	});

	// 🔥 після видалення
	if (isDeleted) return null;

	// 🔥 loading
	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-[60vh] text-3xl font-semibold'>
				Loading...
			</div>
		);
	}

	// 🔥 not found
	if (!property) {
		return (
			<div className='flex items-center justify-center h-[60vh] text-3xl font-semibold'>
				Property not found
			</div>
		);
	}

	return (
		<section className='mt-10 px-2 sm:px-4'>
			{/* 🖼️ GALLERY */}
			<div className='w-full mb-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
					{property.images?.length > 0 ? (
						property.images.map((img: string) => (
							<img
								key={img}
								src={`http://localhost:5000/${img}`}
								className='w-full h-[220px] sm:h-[200px] md:h-[180px] object-cover rounded'
								alt={property.title}
							/>
						))
					) : (
						<img
							src='/placeholder2.png'
							className='w-full h-[220px] object-cover rounded'
							alt='no image'
						/>
					)}
				</div>
			</div>

			{/* 🧾 INFO */}
			<div className='flex flex-col sm:flex-row sm:justify-between gap-6 bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-lg relative'>
				<div className='max-w-xl'>
					<h1 className='text-3xl sm:text-4xl font-bold text-[var(--gold)] mb-2 tracking-wide'>
						{property.title}
					</h1>

					<p className='text-gray-400 mb-4'>📍 {property.location}</p>

					<p className='text-2xl sm:text-3xl font-semibold text-white mb-4'>
						${property.price.toLocaleString()}
					</p>
				</div>

				{/* BUTTONS */}
				<div className='absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 w-[120px]'>
					<Button
						variant='outline'
						disabled={deleteMutation.isPending}
						onClick={() =>
							router.push(`/properties/${property.id}/edit`)
						}
					>
						✏️ Edit
					</Button>

					<Button
						variant='outline'
						disabled={deleteMutation.isPending}
						onClick={() => setIsOpen(true)}
						className='border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white'
					>
						{deleteMutation.isPending ? 'Deleting...' : '🗑 Delete'}
					</Button>
				</div>
			</div>

			{/* MODAL */}
			<ConfirmModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onConfirm={() =>
					deleteMutation.mutate(property.id || property._id)
				}
				title='Delete property?'
				description='This action cannot be undone.'
			/>
		</section>
	);
}
