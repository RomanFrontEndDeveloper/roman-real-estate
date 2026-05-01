export const deleteProperty = async (id: string) => {
	const token = localStorage.getItem('token');

	if (!token) {
		throw new Error('No token found. Please login.');
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`, // 🔐 ОБОВʼЯЗКОВО
			},
		},
	);

	if (!res.ok) {
		throw new Error('Failed to delete property');
	}

	return true;
};
