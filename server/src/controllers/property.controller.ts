import { Request, Response } from 'express';
import * as service from '../services/property.service';

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
