'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyById } from '@/entities/property/api/getPropertyById';
import { Button } from '@/shared/ui/Button';

export default function PropertyPage() {
	const { id } = useParams();
	const router = useRouter();

	const { data: property, isLoading } = useQuery({
		queryKey: ['property', id],
		queryFn: () => getPropertyById(id as string),
	});

	if (isLoading && !property) {
		return <div className='text-white pt-6 ml-2'>Loading...</div>;
	}

	if (!property) {
		return <div className='text-white pt-6 ml-2'>Property not found</div>;
	}

	return (
		<section className='mt-10'>
			{/* 🔥 ГАЛЕРЕЯ */}
			<div className='w-full mb-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
					{property.images?.length > 0 ? (
						property.images.map((img) => (
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

			{/* 🔥 КНОПКА */}

			{/* 🔥 ІНФА */}
			<div className='flex flex-col sm:flex-row sm:justify-between gap-6 bg-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-lg relative'>
				{/* LEFT */}
				<div className='max-w-xl'>
					<h1 className='text-3xl sm:text-4xl font-bold text-[var(--gold)] mb-2 tracking-wide'>
						{property.title}
					</h1>

					<p className='text-gray-400 mb-4'>📍 {property.location}</p>

					<p className='text-2xl sm:text-3xl font-semibold text-white mb-4'>
						${property.price.toLocaleString()}
					</p>
				</div>

				{/* RIGHT BUTTON */}
				<div className='absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 w-[120px]'>
					{/* EDIT */}
					<Button
						variant='outline'
						className='
      w-full
      px-4 py-2
      border border-gray-600
      text-white
      rounded-xl
      bg-white/5 backdrop-blur-md
      hover:bg-white hover:text-black
      hover:scale-105
      transition-all duration-300
      shadow-md
    '
						onClick={() =>
							router.push(`/properties/${property.id}/edit`)
						}
					>
						✏️ Edit
					</Button>

					{/* DELETE */}
					<Button
						variant='outline'
						className='
      w-full
      px-4 py-2
      border border-red-500/40
      text-red-400
      rounded-xl
      bg-red-500/10 backdrop-blur-md
      hover:bg-red-500 hover:text-white
      hover:scale-105
      transition-all duration-300
      shadow-md
    '
						onClick={(e) => {
							e.preventDefault();

							if (confirm('Delete this property?')) {
								mutation.mutate(property.id || property._id);
							}
						}}
					>
						🗑 Delete
					</Button>
				</div>
			</div>
		</section>
	);
}
