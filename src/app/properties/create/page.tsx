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
	const [files, setFiles] = useState<File[]>([]);

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

		if (!title || !price || !location || files.length === 0) {
			alert('Fill all fields');
			return;
		}

		mutation.mutate({
			title,
			price: Number(price),
			location,
			images: files, // 🔥 просто передаємо файли
		});
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
					<label
						htmlFor='fileInput'
						className='cursor-pointer bg-amber-900 hover:bg-amber-800 text-white px-6 py-3 rounded-xl transition text-center'
					>
						📷 Add photos
					</label>
					<input
						type='file'
						multiple
						hidden
						id='fileInput'
						onChange={(e) => {
							if (e.target.files) {
								setFiles(Array.from(e.target.files));
							}
						}}
					/>
					<p className='text-[var(--gray)]'> Only 1 - 5 Foto</p>
					<div className='grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4'>
						{files.map((file, index) => {
							const url = URL.createObjectURL(file);

							return (
								<div
									key={file.name + file.lastModified}
									className='relative group w-full h-[90px] sm:h-[100px]'
								>
									<img
										src={url}
										className='w-full h-full object-cover rounded-lg'
										alt='preview'
									/>

									<button
										type='button'
										onClick={() => {
											setFiles((prev) =>
												prev.filter(
													(_, i) => i !== index,
												),
											);
										}}
										className='absolute top-1 right-1 bg-black/70 text-white text-xs px-2 rounded opacity-0 group-hover:opacity-100 transition'
									>
										✕
									</button>
								</div>
							);
						})}
					</div>

					<Button type='submit' className='sm:w-[200px] mt-2'>
						{mutation.isPending ? 'Creating...' : 'Create'}
					</Button>
				</form>
			</div>
		</section>
	);
}
