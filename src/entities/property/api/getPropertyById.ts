export const getPropertyById = async (id: string) => {
	const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error('Property not found');
	}

	const item = await res.json();

	return {
		...item,
		id: item._id,
	};
};
