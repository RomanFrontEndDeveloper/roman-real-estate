export const getProperties = async () => {
	await new Promise((resolve) => setTimeout(resolve, 500)); // імітація запиту

	return [
		{
			id: '1',
			title: 'Modern Apartment',
			price: 120000,
			location: 'Kyiv',
			image: '/images/p1.png',
		},
		{
			id: '2',
			title: 'Luxury Villa',
			price: 450000,
			location: 'Lviv',
			image: '/images/p2.png',
		},
		{
			id: '3',
			title: 'City Loft',
			price: 200000,
			location: 'Odessa',
			image: '/images/p3.png',
		},
	];
};
