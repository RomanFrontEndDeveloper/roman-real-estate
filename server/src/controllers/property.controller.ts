import { Response } from 'express';
import { PropertyModel } from '../models/property.model';
import * as service from '../services/property.service';
import { AuthRequest } from '../middleware/auth.middleware';

// 📥 Отримати всі
export const getProperties = async (req: AuthRequest, res: Response) => {
	try {
		const properties = await service.getAll();
		res.json(properties);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

// 📥 Отримати один
export const getPropertyById = async (req: AuthRequest, res: Response) => {
	try {
		const property = await service.getById(req.params.id as string);

		if (!property) {
			return res.status(404).json({ message: 'Not found' });
		}

		res.json(property);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

// ➕ Створити (🔥 ДОДАЛИ owner)
export const createProperty = async (req: AuthRequest, res: Response) => {
	try {
		const property = await PropertyModel.create({
			...req.body,
			owner: req.user!.id, // 🔥 головне
		});

		res.status(201).json(property);
	} catch (error) {
		res.status(400).json({ message: 'Failed to create property' });
	}
};

// ❌ Видалити
export const deleteProperty = async (req: AuthRequest, res: Response) => {
	try {
		const property = await PropertyModel.findById(req.params.id as string);

		if (!property) {
			return res.status(404).json({ message: 'Not found' });
		}

		// 🔥 ТУТ ТЕЖ
		if (
			req.user!.role !== 'admin' &&
			property.owner.toString() !== req.user!.id
		) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		await property.deleteOne();

		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

// ✏️ Оновити
export const updateProperty = async (req: AuthRequest, res: Response) => {
	try {
		const { id } = req.params;

		const property = await PropertyModel.findById(id as string);

		if (!property) {
			return res.status(404).json({ message: 'Not found' });
		}

		// 🔥 ОЦЕ ВСТАВЛЯЄШ СЮДИ
		if (
			req.user!.role !== 'admin' &&
			property.owner.toString() !== req.user!.id
		) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		const updated = await PropertyModel.findByIdAndUpdate(
			id as string,
			req.body,
			{ new: true },
		);

		res.json(updated);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

export const getMyProperties = async (req: AuthRequest, res: Response) => {
	try {
		const properties = await PropertyModel.find({
			owner: req.user!.id, // 🔥 тільки свої
		});

		res.json(properties);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch properties' });
	}
};
