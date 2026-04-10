import Image from 'next/image';

export default async function PropertyPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const properties = [
		{
			id: '1',
			title: 'Modern Apartment',
			price: 120000,
			location: 'Kyiv',
			image: '/images/p1.png',
		},
		{
			id: '2',
			title: 'Luxury Villa',
			price: 450000,
			location: 'Lviv',
			image: '/images/p2.png',
		},
		{
			id: '3',
			title: 'City Loft',
			price: 200000,
			location: 'Odessa',
			image: '/images/p3.png',
		},
	];

	const property = properties.find((p) => p.id === id);

	if (!property) {
		return <div className='text-white'>Property not found</div>;
	}

	return (
		<section className='mt-10'>
			<div className='relative w-full h-[350px] overflow-hidden'>
				<Image
					src={property.image}
					alt={property.title}
					fill
					className='object-cover transition duration-500 group-hover:scale-110'
					sizes='(max-width: 768px) 100vw, 33vw'
				/>
			</div>

			<h1 className='text-4xl font-bold text-[var(--gold)] mb-2'>
				{property.title}
			</h1>

			<p className='text-gray-400 mb-4'>{property.location}</p>

			<p className='text-2xl font-semibold mb-6'>
				${property.price.toLocaleString()}
			</p>

			<p className='text-gray-300 max-w-xl'>
				Luxury property with modern design, perfect location and premium
				infrastructure.
			</p>
		</section>
	);
}
