export const createProperty = async (data: {
	title: string;
	price: number;
	location: string;
	images: File[];
}) => {
	const token = localStorage.getItem('token');

	const formData = new FormData();

	formData.append('title', data.title);
	formData.append('price', data.price.toString());
	formData.append('location', data.location);

	data.images.forEach((file) => {
		formData.append('images', file); // 🔥 головне
	});

	const res = await fetch('http://127.0.0.1:5000/api/properties', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`, // ❗ БЕЗ Content-Type
		},
		body: formData,
	});

	if (!res.ok) {
		const errorText = await res.text();
		console.error('CREATE ERROR:', errorText);
		throw new Error('Failed to create property');
	}

	return res.json();
};
