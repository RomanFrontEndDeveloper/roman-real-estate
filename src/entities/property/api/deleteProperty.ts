export const deleteProperty = async (id: string) => {
	const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Failed to delete property');
	}

	return true;
};
