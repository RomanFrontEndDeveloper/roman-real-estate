export const updateProperty = async ({
	id,
	data,
}: {
	id: string;
	data: {
		title: string;
		price: number;
		location: string;
		existingImages: string[];
		newImages: File[];
	};
}) => {
	const token = localStorage.getItem('token');

	if (!token) {
		throw new Error('No token found. Please login.');
	}

	const formData = new FormData();

	formData.append('title', data.title);
	formData.append('price', String(data.price));
	formData.append('location', data.location);

	// 🔥 старі фото (які залишили)
	data.existingImages.forEach((img) => {
		formData.append('existingImages', img);
	});

	// 🔥 нові фото
	data.newImages.forEach((file) => {
		formData.append('images', file);
	});

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`, // ❗ БЕЗ Content-Type
			},
			body: formData,
		},
	);

	if (!res.ok) {
		throw new Error('Failed to update property');
	}

	return res.json();
};
