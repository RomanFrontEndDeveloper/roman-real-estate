export const deleteProperty = async (id: string) => {
	const token = localStorage.getItem('token');

	if (!token) {
		throw new Error('You are not logged in');
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (!res.ok) {
		const data = await res.json().catch(() => null);
		throw new Error(data?.message || `Error ${res.status}`);
	}

	return true;
};
