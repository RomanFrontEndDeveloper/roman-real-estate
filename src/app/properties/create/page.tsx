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
	const [file, setFile] = useState<File | null>(null);

	const queryClient = useQueryClient();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: createProperty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['properties'] });
			router.push('/properties');
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !price || !location || !file) {
			alert('Fill all fields');
			return;
		}

		try {
			// 🔥 1. Upload файла
			const formData = new FormData();
			formData.append('image', file);

			const uploadRes = await fetch(
				'http://localhost:5000/api/properties/upload',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: formData,
				},
			);

			if (!uploadRes.ok) {
				throw new Error('Upload failed');
			}

			const uploadData = await uploadRes.json();

			// 🔥 2. Створення property
			mutation.mutate({
				title,
				price: Number(price),
				location,
				image: uploadData.imageUrl,
			});
		} catch (error) {
			console.error(error);
			alert('Error creating property');
		}
	};

	return (
		<section className='flex justify-center mt-10 px-4'>
			<div className='w-full max-w-xl'>
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

					<input
						type='file'
						className='w-[210px] bg-amber-950 p-2'
						onChange={(e) => {
							if (e.target.files) {
								setFile(e.target.files[0]);
							}
						}}
					/>

					{file && <p>{file.name}</p>}

					<Button type='submit' className='sm:w-[200px] mt-2'>
						{mutation.isPending ? 'Creating...' : 'Create'}
					</Button>
				</form>
			</div>
		</section>
	);
}
