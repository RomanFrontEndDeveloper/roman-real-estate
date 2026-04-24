import { Hero } from '@/shared/components/Hero';
import { PropertyCard } from '@/entities/property/ui/PropertyCard';
import { getProperties } from '@/entities/property/api/getProperties';

export const metadata = {
	title: 'Roman Real Estate | Buy & Rent Properties',
	description:
		'Find the best real estate properties. Buy, rent, and explore luxury homes.',
};

export default async function Home() {
	let properties;

	try {
		properties = await getProperties();
	} catch {
		properties = { data: [] };
	}

	return (
		<>
			{/* HERO */}
			<Hero />

			{/* PROPERTIES */}
			<section className='mt-16'>
				{properties?.data?.length > 0 && (
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
