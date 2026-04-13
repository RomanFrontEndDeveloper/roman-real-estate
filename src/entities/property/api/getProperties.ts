export type Property = {
	id: string;
	title: string;
	price: number;
	location: string;
	image: string;
};

export const mockProperties: Property[] = [
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

export const getProperties = async (): Promise<Property[]> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 500));

		return mockProperties;
	} catch (error) {
		console.error('getProperties error:', error);

		throw new Error('Failed to fetch properties');
	}
};
