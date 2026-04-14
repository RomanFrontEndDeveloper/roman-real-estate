import { Hero } from '@/shared/components/Hero';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';
import { properties } from '@/entities/property/model/data';

export default function Home() {
	return (
		<>
			{/* HERO */}
			<Hero />

			{/* POPULAR PROPERTIES */}
			<section className='mt-16'>
				<h2 className='text-3xl font-bold mb-6 text-[var(--gold)]'>
					Popular Properties
				</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					{properties.map((property) => (
						<PropertyCard key={property.id} property={property} />
					))}
				</div>
			</section>
		</>
	);
}
