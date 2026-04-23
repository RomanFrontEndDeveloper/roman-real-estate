export const toggleFavorite = async (propertyId: string) => {
	const token = localStorage.getItem('token');

	const res = await fetch('http://localhost:5000/api/users/favorites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ propertyId }),
	});

	if (!res.ok) {
		throw new Error('Failed to toggle favorite');
	}

	return res.json();
};
