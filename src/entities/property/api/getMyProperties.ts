export const getMyProperties = async () => {
	const token = localStorage.getItem('token');

	const res = await fetch('http://localhost:5000/api/properties/my', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error('Failed to fetch my properties');
	}

	const data = await res.json();

	return data.map((item: any) => ({
		...item,
		id: item._id,
	}));
};
