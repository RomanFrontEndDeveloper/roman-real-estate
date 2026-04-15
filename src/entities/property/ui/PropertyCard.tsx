'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Property } from '@/entities/property/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProperty } from '@/entities/property/api/deleteProperty';
import { Button } from '@/shared/ui/Button';

type Props = {
	property: Property;
};

export const PropertyCard = ({ property }: Props) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteProperty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['properties'] });
		},
	});

	return (
		<Link href={`/properties/${property.id}`}>
			<motion.div
				className='group bg-[var(--secondary)] rounded overflow-hidden cursor-pointer hover:shadow-[0_0_25px_rgba(201,169,110,0.2)] transition'
				whileHover={{ scale: 1.04, y: -5 }}
				transition={{ duration: 0.3 }}
			>
				<div className='relative'>
					<div className='relative w-full h-[220px] overflow-hidden'>
						<Image
							src={
								typeof property.image === 'string' &&
								property.image.startsWith('/')
									? property.image
									: '/placeholder.png'
							}
							alt={property.title}
							fill
							sizes='(max-width: 768px) 100vw, 33vw' // 👈 ДОДАЙ ЦЕ
							className='object-cover transition duration-500 group-hover:scale-110'
						/>
					</div>

					<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300' />

					<div className='absolute bottom-3 left-3 bg-[var(--gold)] text-black px-3 py-1 text-sm font-semibold'>
						${property.price.toLocaleString()}
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='p-4'>
						<h3 className='text-lg font-semibold mb-1 hover:text-[var(--gold)] transition'>
							{property.title}
						</h3>

						<p className='text-gray-400 text-sm'>
							{property.location}
						</p>
					</div>
					<div className='pt-6 pr-6'>
						<Button
							variant='outline'
							onClick={(e) => {
								e.preventDefault(); // ❗ щоб не відкривався Link

								if (confirm('Delete this property?')) {
									mutation.mutate(property.id);
								}
							}}
						>
							Delete
						</Button>
					</div>
				</div>
			</motion.div>
		</Link>
	);
};
