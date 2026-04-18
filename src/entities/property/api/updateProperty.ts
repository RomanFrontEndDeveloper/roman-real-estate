export const updateProperty = async ({
	id,
	data,
}: {
	id: string;
	data: {
		title: string;
		price: number;
		location: string;
		image: string;
	};
}) => {
	const token = localStorage.getItem('token');

	if (!token) {
		throw new Error('No token found. Please login.');
	}

	const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`, // 🔐 ДОДАЛИ
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error('Failed to update property');
	}

	return res.json();
};
