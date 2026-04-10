import { PropertyCard } from '@/entities/property/ui/PropertyCard';

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

export default function PropertiesPage() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-5'>
			{properties.map((property) => (
				<PropertyCard key={property.id} property={property} />
			))}
		</div>
	);
}
