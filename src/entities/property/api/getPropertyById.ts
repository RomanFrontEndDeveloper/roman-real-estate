export const getPropertyById = async (id: string) => {
	const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		return null;
	}
	const item = await res.json();

	return {
		...item,
		id: item._id, //Візьми об’єкт і додай до нього нормальне поле id замість _id
	};
};
