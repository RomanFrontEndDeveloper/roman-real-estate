'use client';

import { useQuery } from '@tanstack/react-query';
import { getProperties } from '@/entities/property/api/getProperties';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';

export default function PropertiesPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['properties'],
		queryFn: getProperties,
	});

	if (isLoading) {
		return (
			<div className='text-white flex justify-center mt-5'>
				Loading...
			</div>
		);
	}

	if (error) {
		return <div className='text-red-500'>Error loading properties</div>;
	}

	return (
		<section>
			<h1 className='text-3xl font-bold text-[var(--gold)] mb-6 mt-4 ml-3'>
				Properties
			</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{data?.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>
		</section>
	);
}
