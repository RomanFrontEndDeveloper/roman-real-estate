export const getPropertyById = async (id: string) => {
	const res = await fetch(`http://localhost:5000/api/properties/${id}`);

	if (!res.ok) {
		throw new Error('Failed to fetch property');
	}

	const data = await res.json();

	// 🔥 ВАЖЛИВО
	return {
		...data,
		id: data._id,
	};
};
