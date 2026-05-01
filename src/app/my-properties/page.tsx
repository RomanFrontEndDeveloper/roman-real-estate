'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyProperties } from '@/entities/property/api/getMyProperties';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';
import { Property } from '@/entities/property/types';

export default function MyPropertiesPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['my-properties'],
		queryFn: getMyProperties,
	});

	if (isLoading) {
		return <div className='text-white p-6'>Loading...</div>;
	}

	if (error) {
		return (
			<div className='text-red-500 p-6'>Failed to load property ❌</div>
		);
	}

	return (
		<section className='px-4 sm:px-6 lg:px-8 mt-6'>
			<h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left'>
				My Properties
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{data?.map((property: Property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>
		</section>
	);
}
