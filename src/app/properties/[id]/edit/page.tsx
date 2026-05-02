'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyById } from '@/entities/property/api/getPropertyById';
import { updateProperty } from '@/entities/property/api/updateProperty';
import { useState, useEffect } from 'react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export default function EditPropertyPage() {
	const { id } = useParams();
	const router = useRouter();
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ['property', id],
		queryFn: () => getPropertyById(id as string),
	});

	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [location, setLocation] = useState('');

	const [files, setFiles] = useState<File[]>([]); // нові фото
	const [existingImages, setExistingImages] = useState<string[]>([]); // старі фото

	// 🔥 заповнення форми
	useEffect(() => {
		if (data) {
			setTitle(data.title);
			setPrice(String(data.price));
			setLocation(data.location);
			setExistingImages(data.images || []);
		}
	}, [data]);

	const mutation = useMutation({
		mutationFn: updateProperty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['properties'] });
			router.push('/properties');
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		mutation.mutate({
			id: id as string,
			data: {
				title,
				price: Number(price),
				location,
				existingImages, // що залишили
				newImages: files, // що додали
			},
		});
	};

	return (
		<section className='flex justify-center mt-10 px-4'>
			<div className='w-full max-w-xl'>
				<h1 className='text-3xl font-bold text-[var(--gold)] mb-8 text-center'>
					Edit Property
				</h1>

				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-4 w-full items-center mb-5'
				>
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<Input
						type='number'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>

					<Input
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>

					{/* 📷 КНОПКА */}
					<label
						htmlFor='fileInput'
						className='cursor-pointer bg-amber-900 hover:bg-amber-800 text-white px-6 py-3 rounded-xl transition text-center'
					>
						📷 Add photos
					</label>

					<input
						type='file'
						multiple
						id='fileInput'
						className='hidden'
						onChange={(e) => {
							console.log('CHANGE TRIGGERED');
							if (e.target.files) {
								//(e.target.files) це FileList НЕ масив
								const arr = Array.from(e.target.files); //перетворюєм в масив File[]

								setFiles((prev) => [
									...prev,
									...Array.from(e.target.files!),
								]);
							}
						}}
					/>

					<p className='text-gray-400 text-sm text-center bg-gray-950 rounded-xl p-3'>
						You can add new photos <br /> or remove old ones <br />
						(all 1 - 10 Foto)
					</p>

					{/* 🔥 СТАРІ ФОТО */}
					{existingImages.length > 0 && (
						<div className='w-full'>
							<p className='text-sm text-gray-400 mb-2'>
								Current photos
							</p>

							<div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
								{existingImages.map((img, index) => (
									<div
										key={img + index}
										className='relative group h-[90px] w-[120px]'
									>
										<img
											src={img}
											className='w-full h-full object-cover rounded-lg'
										/>

										<button
											type='button'
											onClick={() => {
												setExistingImages((prev) =>
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
								))}
							</div>
						</div>
					)}

					{/* 🔥 НОВІ ФОТО */}
					{files.length > 0 && (
						<div className='w-full'>
							<p className='text-sm text-gray-400 mb-2'>
								New photos
							</p>

							<div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
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
															(_, i) =>
																i !== index,
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
						</div>
					)}

					<Button type='submit' className='sm:w-[200px] mt-4'>
						{mutation.isPending ? 'Saving...' : 'Save'}
					</Button>
				</form>
			</div>
		</section>
	);
}
