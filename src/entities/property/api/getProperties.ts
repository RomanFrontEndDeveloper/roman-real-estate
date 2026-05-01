export const getProperties = async (page = 1, filters?, limit = 3) => {
	try {
		const params = new URLSearchParams(); //“зручний спосіб збирати рядок типу ?page=1&limit=3”

		params.append('page', String(page));
		params.append('limit', String(limit));

		if (filters?.city) params.append('city', filters.city);
		if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice);

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/properties?${params.toString()}`,
		);

		// якщо не знайдено
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

		const data = await res.json();

		return {
			...data,
			data: data.data.map((item: any) => ({
				...item,
				id: item._id,
			})),
		};
	} catch (error) {
		console.error('❌ FETCH ERROR:', error);

		// 🔥 fallback щоб НЕ падав SSR
		return {
			data: [],
			total: 0,
			page,
			pages: 0,
		};
	}
};
