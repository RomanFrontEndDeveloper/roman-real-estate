export const getPropertyById = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
	);

	if (!res.ok) {
		throw new Error('Failed to fetch property');
	}

	const data = await res.json();

	if (!data || !data._id) {
		throw new Error('Property not found');
	}

	return {
		...data,
		id: data._id,
	};
};
