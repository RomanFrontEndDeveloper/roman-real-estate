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

	const propertyId = Array.isArray(id) ? id[0] : (id ?? '');
	const [isOpen, setIsOpen] = useState(false);

	// 🔥 GET PROPERTY
	const { data: property, isLoading } = useQuery({
		queryKey: ['property', propertyId],
		queryFn: () => getPropertyById(propertyId),
		retry: false,
		enabled: !!propertyId,
	});

	// 🔥 DELETE
	const deleteMutation = useMutation({
		mutationFn: deleteProperty,
		onSuccess: () => {
			toast.success('Property deleted 🗑');
			queryClient.invalidateQueries({ queryKey: ['properties'] });
			router.push('/properties');
		},
		onError: (error: any) => {
			toast.error(error?.message || 'Failed to delete ❌');
		},
	});

	const currentId = property?.id || property?._id;

	const handleDelete = () => {
		if (!currentId) return;
		deleteMutation.mutate(currentId);
	};

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
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6'>
				{property.images?.length > 0 ? (
					property.images.map((img: string) => (
						<img
							key={img}
							src={`http://localhost:5000/${img}`}
							className='w-full h-[200px] object-cover rounded'
							alt={property.title}
						/>
					))
				) : (
					<img
						src='/placeholder2.png'
						className='w-full h-[200px] object-cover rounded'
						alt='no image'
					/>
				)}
			</div>

			{/* 🧾 INFO */}
			<div className='flex flex-col sm:flex-row justify-between gap-6 bg-[#0f0f0f] p-6 rounded-2xl border border-gray-800 shadow-lg relative'>
				<div>
					<h1 className='text-3xl font-bold text-[var(--gold)] mb-2'>
						{property.title}
					</h1>

					<p className='text-gray-400 mb-4'>📍 {property.location}</p>

					<p className='text-2xl font-semibold text-white'>
						${property.price.toLocaleString()}
					</p>
				</div>

				<div className='flex flex-col gap-3 w-[120px]'>
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
				onConfirm={handleDelete}
				title='Delete property?'
				description='This action cannot be undone.'
			/>
		</section>
	);
}
