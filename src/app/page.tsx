import { Hero } from '@/shared/components/Hero';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';
import { getProperties } from '@/entities/property/api/getProperties';

export default async function Home() {
	const properties = await getProperties();
	return (
		<>
			{/* HERO */}
			<Hero />

			{/* POPULAR PROPERTIES */}
			<section className='mt-16'>
				{properties?.length > 0 && (
					<h2 className='text-3xl font-bold mb-6 text-[var(--gold)]'>
						Popular Properties
					</h2>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{properties?.data?.slice(0, 3).map((property) => (
						<PropertyCard key={property.id} property={property} />
					))}
				</div>
			</section>
		</>
	);
}
