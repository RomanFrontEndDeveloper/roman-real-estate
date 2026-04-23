export const getProperties = async (filters?: {
	city?: string;
	maxPrice?: string;
}) => {
	const params = new URLSearchParams();

	if (filters?.city) params.append('city', filters.city);
	if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice);

	const res = await fetch(
		`http://localhost:5000/api/properties?${params.toString()}`,
	);

	if (!res.ok) {
		throw new Error('Failed to fetch properties');
	}

	const data = await res.json();

	// 🔥 ОЦЕ ГОЛОВНЕ
	return data.map((item: any) => ({
		...item,
		id: item._id,
	}));
};
