export type Property = {
	id: string;
	_id?: string;
	title: string;
	price: number;
	location: string;
	images: string[];
};
export const getId = (p: Property): string => {
	if (p.id) return p.id;
	if (p._id) return p._id; // нормалізує різні формати даних до одного результату

	throw new Error('Property has no id');
};
