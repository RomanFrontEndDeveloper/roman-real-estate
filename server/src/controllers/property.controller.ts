import { Request, Response } from 'express';
import * as service from '../services/property.service';
import { PropertyModel } from '../models/property.model';

export const getProperties = async (req: Request, res: Response) => {
	const properties = await service.getAll();
	res.json(properties);
};

export const getPropertyById = async (req: Request, res: Response) => {
	const property = await service.getById(req.params.id as string);

	if (!property) {
		return res.status(404).json({ message: 'Not found' });
	}

	res.json(property);
};

export const createProperty = async (req: Request, res: Response) => {
	const property = await service.create(req.body);
	res.status(201).json(property);
};

export const deleteProperty = async (req: Request, res: Response) => {
	await service.remove(req.params.id as string);
	res.status(204).send();
};

export const updateProperty = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const updated = await PropertyModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!updated) {
			return res.status(404).json({ message: 'Not found' });
		}

		res.json(updated);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
