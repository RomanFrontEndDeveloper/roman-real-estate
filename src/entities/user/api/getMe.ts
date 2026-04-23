export const getMe = async () => {
	const token = localStorage.getItem('token');

	const res = await fetch('http://localhost:5000/api/users/me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error('Failed to fetch user');
	}

	return res.json();
};
