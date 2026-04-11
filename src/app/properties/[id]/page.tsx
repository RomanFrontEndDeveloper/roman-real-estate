import Image from 'next/image';
import { getPropertyById } from '@/entities/property/api/getPropertyById';

export default async function PropertyPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const property = await getPropertyById(id);

	if (!property) {
		return <div className='text-white pt-6 ml-2'>Property not found</div>;
	}

	return (
		<section className='mt-10'>
			{/* IMAGE */}
			<div className='relative w-full h-[350px] overflow-hidden rounded mb-6 group'>
				<Image
					src={property.image}
					alt={property.title}
					fill
					className='object-cover transition duration-500 group-hover:scale-110'
					sizes='(max-width: 768px) 100vw, 1200px'
				/>

				{/* overlay */}
				<div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition' />
			</div>

			{/* TITLE */}
			<h1 className='text-3xl sm:text-4xl font-bold text-[var(--gold)] mb-2'>
				{property.title}
			</h1>

			{/* LOCATION */}
			<p className='text-gray-400 mb-4'>{property.location}</p>

			{/* PRICE */}
			<p className='text-2xl font-semibold mb-6'>
				${property.price.toLocaleString()}
			</p>

			{/* DESCRIPTION */}
			<p className='text-gray-300 max-w-xl'>
				Luxury property with modern design, perfect location and premium
				infrastructure.
			</p>
		</section>
	);
}
