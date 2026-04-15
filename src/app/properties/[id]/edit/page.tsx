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
	const [image, setImage] = useState('');

	// 🔥 заповнюємо форму
	useEffect(() => {
		if (data) {
			setTitle(data.title);
			setPrice(String(data.price));
			setLocation(data.location);
			setImage(data.image);
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
				image,
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
					<Input
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>

					<Button type='submit' className='sm:w-[200px] w-full'>
						{mutation.isPending ? 'Saving...' : 'Save'}
					</Button>
				</form>
			</div>
		</section>
	);
}
