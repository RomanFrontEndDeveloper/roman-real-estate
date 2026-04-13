import { Property } from '@/entities/property/types';
import { properties } from '../model/data';

export const getProperties = async (): Promise<Property[]> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 500));

		return properties;
	} catch (error) {
		console.error('getProperties error:', error);

		throw new Error('Failed to fetch properties');
	}
};
