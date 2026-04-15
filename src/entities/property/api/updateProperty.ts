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
	const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error('Failed to update property');
	}

	return res.json();
};
