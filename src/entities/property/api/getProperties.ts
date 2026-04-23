export const getProperties = async (
	page = 1,
	filters?: {
		city?: string;
		maxPrice?: string;
	},
) => {
	const params = new URLSearchParams();

	params.append('page', String(page));
	params.append('limit', '3');

	if (filters?.city) params.append('city', filters.city);
	if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice);

	const res = await fetch(
		`http://localhost:5000/api/properties?${params.toString()}`,
	);

	if (!res.ok) {
		throw new Error('Failed to fetch properties');
	}

	const data = await res.json();

	// 🔥 трансформуємо тільки data.data
	return {
		...data,
		data: data.data.map((item: any) => ({
			...item,
			id: item._id,
		})),
	};
};
