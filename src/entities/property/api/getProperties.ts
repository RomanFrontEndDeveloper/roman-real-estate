export const getProperties = async () => {
	const res = await fetch('http://localhost:5000/api/properties', {
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error('Failed to fetch');
	}

	const data = await res.json();

	return data.map((item: any) => ({
		...item,
		id: item._id,
	}));
};
