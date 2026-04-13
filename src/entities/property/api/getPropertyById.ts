import { Property } from '../types';
import { properties } from '../model/data';

export const getPropertyById = async (
	id: string,
): Promise<Property | undefined> => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	return properties.find((p) => p.id === id);
};
