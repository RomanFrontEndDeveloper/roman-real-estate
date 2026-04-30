import { getPropertyById } from '@/entities/property/api/getPropertyById';
import PropertyPageClient from './PropertyPageClient';

// 🔥 SEO
export async function generateMetadata({ params }) {
	const { id } = await params;

	try {
		const property = await getPropertyById(id);

		return {
			title: `${property.title} | Roman Real Estate`,
			description: `${property.title} in ${property.location} for $${property.price}`,
		};
	} catch {
		return {
			title: 'Property not found',
			description: 'This property does not exist',
		};
	}
}

// 🔥 PAGE
export default async function Page({ params }) {
	const { id } = await params;

	return <PropertyPageClient id={id} />;
}
