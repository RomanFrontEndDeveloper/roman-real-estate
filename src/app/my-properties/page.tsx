'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyProperties } from '@/entities/property/api/getMyProperties';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';

export default function MyPropertiesPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['my-properties'],
		queryFn: getMyProperties,
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading properties</p>;

	return (
		<section className='px-4 sm:px-6 lg:px-8 mt-6'>
			<h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left'>
				My Properties
			</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{data?.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>
		</section>
	);
}
