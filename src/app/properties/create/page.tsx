'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProperty } from '@/entities/property/api/createProperty';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export default function CreatePropertyPage() {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [location, setLocation] = useState('');
	const [image, setImage] = useState('');

	const queryClient = useQueryClient();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: createProperty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['properties'] });
			router.push('/properties');
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !price || !location || !image) {
			alert('Fill all fields');
			return;
		}

		mutation.mutate({
			title,
			price: Number(price),
			location,
			image,
		});
	};

	return (
		<section className='flex justify-center mt-10 px-4'>
			<div className='w-full max-w-xl'>
				{/* 🔙 Кнопка назад */}
				<Button
					type='button'
					onClick={() => router.back()}
					className='mb-6 flex m-auto'
				>
					← Back
				</Button>

				<h1 className='text-3xl font-bold text-[var(--gold)] mb-8 text-center'>
					Create Property
				</h1>

				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-4 w-full items-center mb-5'
				>
					<Input
						placeholder='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<Input
						type='number'
						placeholder='Price'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>

					<Input
						placeholder='Location'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>

					<Input
						placeholder='/images/p1.png'
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>

					<Button type='submit' className='sm:w-[200px] mt-2'>
						{mutation.isPending ? 'Creating...' : 'Create'}
					</Button>
				</form>
			</div>
		</section>
	);
}
