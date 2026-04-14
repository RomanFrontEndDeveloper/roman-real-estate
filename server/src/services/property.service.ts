import { PropertyModel } from '../models/property.model';

export const getAll = async () => {
	return PropertyModel.find();
};

export const getById = async (id: string) => {
	return PropertyModel.findById(id);
};

export const create = async (data: any) => {
	return PropertyModel.create(data);
};

export const remove = async (id: string) => {
	return PropertyModel.findByIdAndDelete(id);
};
