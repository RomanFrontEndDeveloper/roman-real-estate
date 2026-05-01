export const getPropertyById = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
	);

	// ✅ ГОЛОВНЕ — не кидати error на 404
	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error('Failed to fetch property');
	}

	const data = await res.json();

	return {
		...data,
		id: data._id,
	};
};
