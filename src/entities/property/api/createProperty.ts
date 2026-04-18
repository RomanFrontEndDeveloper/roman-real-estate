export const createProperty = async (data: {
	title: string;
	price: number;
	location: string;
	image: string;
}) => {
	const token = localStorage.getItem('token');

	const res = await fetch('http://localhost:5000/api/properties', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`, // 🔐 ДОДАЛИ TOKEN
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error('Failed to create property');
	}

	return res.json();
};
