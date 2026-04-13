import { Property, mockProperties } from './getProperties';

export const getPropertyById = async (id: string): Promise<Property> => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const property = mockProperties.find((p) => p.id === id);

	if (!property) {
		throw new Error('Property not found');
	}

	return property;
};
