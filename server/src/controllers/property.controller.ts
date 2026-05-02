import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { PropertyModel } from '../models/property.model';
import { AuthRequest } from '../middleware/auth.middleware';
import cloudinary from '../config/cloudinary';
import streamifier from 'streamifier';

// helper для перевірки ID
const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// 📥 Отримати всі
export const getProperties: RequestHandler = async (req, res, next) => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 3;

		const filter: {
			location?: { $regex: string; $options: string };
			price?: { $lte: number };
		} = {};

		if (req.query.city) {
			filter.location = {
				$regex: String(req.query.city),
				$options: 'i',
			};
		}

		if (req.query.maxPrice) {
			filter.price = {
				$lte: Number(req.query.maxPrice),
			};
		}

		const [total, properties] = await Promise.all([
			PropertyModel.countDocuments(filter),
			PropertyModel.find(filter)
				.skip((page - 1) * limit)
				.limit(limit)
				.sort({ createdAt: -1 }),
		]);

		res.json({
			data: properties,
			total,
			page,
			pages: Math.ceil(total / limit),
		});
	} catch (error) {
		next(error);
	}
};

// 📥 Отримати один
export const getPropertyById: RequestHandler = async (req, res, next) => {
	try {
		const id = req.params.id as string;

		if (!isValidId(id)) {
			return next({ status: 400, message: 'Invalid ID' });
		}

		const property = await PropertyModel.findById(id);

		if (!property) {
			return next({ status: 404, message: 'Property not found' });
		}

		res.json(property);
	} catch (error) {
		next(error);
	}
};

// ➕ Створити

export const createProperty = async (req, res) => {
	try {
		const files = req.files as Express.Multer.File[];

		const uploadOne = (file: Express.Multer.File) =>
			new Promise<string>((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{ folder: 'real-estate' },
					(error, result) => {
						if (error) return reject(error);
						resolve(result!.secure_url);
					},
				);

				streamifier.createReadStream(file.buffer).pipe(stream);
			});

		const imageUrls = await Promise.all(files.map(uploadOne));

		const property = await Property.create({
			...req.body,
			images: imageUrls,
		});

		res.json(property);
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: 'Upload error' });
	}
};

// ❌ Видалити
export const deleteProperty: RequestHandler = async (
	req: AuthRequest,
	res,
	next,
) => {
	try {
		const id = req.params.id as string;

		if (!isValidId(id)) {
			return next({ status: 400, message: 'Invalid ID' });
		}

		const property = await PropertyModel.findById(id);

		if (!property) {
			return next({ status: 404, message: 'Property not found' });
		}

		if (
			req.user!.role !== 'admin' &&
			property.owner.toString() !== req.user!.id
		) {
			return next({ status: 403, message: 'Forbidden' });
		}

		await property.deleteOne();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

// ✏️ Оновити
export const updateProperty: RequestHandler = async (
	req: AuthRequest,
	res,
	next,
) => {
	try {
		const id = req.params.id as string;

		if (!isValidId(id)) {
			return next({ status: 400, message: 'Invalid ID' });
		}

		const property = await PropertyModel.findById(id);

		if (!property) {
			return next({ status: 404, message: 'Property not found' });
		}

		if (
			req.user!.role !== 'admin' &&
			property.owner.toString() !== req.user!.id
		) {
			return next({ status: 403, message: 'Forbidden' });
		}

		const files = req.files as Express.Multer.File[] | undefined;

		const existingImages = ([] as string[])
			.concat(req.body.existingImages || [])
			.filter(Boolean);

		property.set({
			title: req.body.title,
			price: Number(req.body.price) || 0,
			location: req.body.location,
			images: [...existingImages, ...(files?.map((f) => f.path) || [])],
		});

		await property.save();

		res.json(property);
	} catch (error) {
		next(error);
	}
};

// 📥 Мої оголошення
export const getMyProperties: RequestHandler = async (
	req: AuthRequest,
	res,
	next,
) => {
	try {
		const properties = await PropertyModel.find({
			owner: req.user!.id,
		}).sort({ createdAt: -1 });

		res.json(properties);
	} catch (error) {
		next(error);
	}
};

// Це middleware для перевірки JWT.
// Я беру токен із заголовка Authorization, перевіряю його через jwt.verify, і якщо він валідний — додаю payload у req.user.
// Якщо токен відсутній або неправильний — повертаю 401.
