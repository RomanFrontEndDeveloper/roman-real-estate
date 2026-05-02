type PropertyFromApi = {
	_id: string;
	title: string;
	price: number;
	location: string;
	images: string[];
	owner: string;
	createdAt: string;
	updatedAt: string;
};

type PropertiesResponse = {
	data: PropertyFromApi[];
	total: number;
	page: number;
	pages: number;
};

export const getProperties = async (
	page = 1,
	filters?: { city?: string; maxPrice?: string },
	limit = 3,
) => {
	try {
		const params = new URLSearchParams();

		params.append('page', String(page));
		params.append('limit', String(limit));

		if (filters?.city) params.append('city', filters.city);
		if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice);

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/properties?${params.toString()}`,
			{
				cache: 'no-store',
			},
		);

		if (res.status === 404) {
			return {
				data: [],
				total: 0,
				page,
				pages: 0,
			};
		}

		if (!res.ok) {
			throw new Error('Failed to fetch properties');
		}

		const data: PropertiesResponse = await res.json();

		return {
			...data,
			data: data.data.map((item) => ({
				...item,
				id: item._id,
			})),
		};
	} catch (error) {
		console.error('❌ FETCH ERROR:', error);

		return {
			data: [],
			total: 0,
			page,
			pages: 0,
		};
	}
};
