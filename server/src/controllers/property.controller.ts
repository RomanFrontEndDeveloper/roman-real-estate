import { Response, Request, RequestHandler } from 'express';
import { PropertyModel } from '../models/property.model';
import { AuthRequest } from '../middleware/auth.middleware';

// 📥 Отримати всі (pagination + filters)
export const getProperties: RequestHandler = async (
	req: Request,
	res: Response,
) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 3;

		const skip = (page - 1) * limit;

		const filter: any = {};

		// 🔍 фільтр по місту
		if (req.query.city && req.query.city !== '') {
			filter.location = {
				$regex: req.query.city,
				$options: 'i',
			};
		}

		// 💰 фільтр по ціні
		if (req.query.maxPrice && req.query.maxPrice !== '') {
			filter.price = {
				$lte: Number(req.query.maxPrice),
			};
		}

		const total = await PropertyModel.countDocuments(filter);

		const properties = await PropertyModel.find(filter)
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });

		res.json({
			data: properties,
			total,
			page,
			pages: Math.ceil(total / limit),
		});
	} catch (error) {
		console.error('GET PROPERTIES ERROR:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

// 📥 Отримати один
export const getPropertyById: RequestHandler = async (req, res) => {
	try {
		if (!req.params.id || req.params.id === 'undefined') {
			return res.status(400).json({ message: 'Invalid ID' });
		}

		const property = await PropertyModel.findById(req.params.id);

		if (!property) {
			return res.status(404).json({ message: 'Not found' });
		}

		res.json(property);
	} catch (error) {
		console.log('GET BY ID ERROR:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

// ➕ Створити
export const createProperty = async (req: AuthRequest, res: Response) => {
	try {
		const files = req.files as Express.Multer.File[];

		const imagePaths = files?.map((file) => file.path) || [];

		const property = await PropertyModel.create({
			title: req.body.title,
			price: Number(req.body.price) || 0,
			location: req.body.location,
			images: imagePaths,
			owner: req.user!.id,
		});

		res.status(201).json(property);
	} catch (error: any) {
		console.error('CREATE ERROR:', error);
		res.status(400).json({ message: error.message });
	}
};

// ❌ Видалити
export const deleteProperty = async (req: AuthRequest, res: Response) => {
	try {
		const property = await PropertyModel.findById(req.params.id);

		if (!property) {
			return res.status(404).json({ message: 'Not found' });
		}

		if (
			req.user!.role !== 'admin' &&
			property.owner.toString() !== req.user!.id
		) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		await property.deleteOne();

		res.status(204).send();
	} catch (error) {
		console.error('DELETE ERROR:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

// ✏️ Оновити
export const updateProperty = async (req: AuthRequest, res: Response) => {
	try {
		const { title, price, location } = req.body;

		const files = req.files as Express.Multer.File[];

		const existingImages = Array.isArray(req.body.existingImages)
			? req.body.existingImages
			: req.body.existingImages
				? [req.body.existingImages]
				: [];

		const newImages = files?.map((file) => file.path) || [];

		const updatedImages = [...existingImages, ...newImages];

		const property = await PropertyModel.findById(req.params.id);

		if (!property) {
			return res.status(404).json({ message: 'Not found' });
		}

		if (
			req.user!.role !== 'admin' &&
			property.owner.toString() !== req.user!.id
		) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		property.title = title;
		property.price = Number(price) || 0;
		property.location = location;
		property.images = updatedImages;

		await property.save();

		res.json(property);
	} catch (error) {
		console.error('UPDATE ERROR:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

// 📥 Мої оголошення
export const getMyProperties = async (req: AuthRequest, res: Response) => {
	try {
		const properties = await PropertyModel.find({
			owner: req.user!.id,
		}).sort({ createdAt: -1 });

		res.json(properties);
	} catch (error) {
		console.error('MY PROPERTIES ERROR:', error);
		res.status(500).json({ message: 'Failed to fetch properties' });
	}
};
