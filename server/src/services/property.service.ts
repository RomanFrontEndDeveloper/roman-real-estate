import { PropertyModel } from '../models/property.model';

//повертає всі об'єкти з бази
export const getAll = async () => {
	return PropertyModel.find();
};

//шукає один документ по ID
export const getById = async (id: string) => {
	return PropertyModel.findById(id);
};

//створює новий запис
export const create = async (data: any) => {
	return PropertyModel.create(data);
};

//видаляє документ по ID
export const remove = async (id: string) => {
	return PropertyModel.findByIdAndDelete(id);
};
