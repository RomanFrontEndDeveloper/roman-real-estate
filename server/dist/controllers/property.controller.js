import mongoose from 'mongoose';
import { PropertyModel } from '../models/property.model';
import cloudinary from '../config/cloudinary';
import streamifier from 'streamifier';

// helper
const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// 🔥 upload helper
const uploadToCloudinary = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'real-estate' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// 📥 Отримати всі
export const getProperties = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const filter: any = {};

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

// 📥 Один
export const getPropertyById = async (req, res, next) => {
  try {
    const id = req.params.id;

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


// ➕ CREATE (🔥 головне тут)
export const createProperty = async (req, res, next) => {
  try {
    const files = req.files as Express.Multer.File[];

    let imageUrls: string[] = [];

    if (files && files.length > 0) {
      imageUrls = await Promise.all(files.map(uploadToCloudinary));
    }

    const property = await PropertyModel.create({
      title: req.body.title,
      price: Number(req.body.price) || 0,
      location: req.body.location,
      images: imageUrls, // 🔥 ТУТ Cloudinary URL
      owner: req.user.id,
    });

    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};


// ❌ DELETE
export const deleteProperty = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!isValidId(id)) {
      return next({ status: 400, message: 'Invalid ID' });
    }

    const property = await PropertyModel.findById(id);

    if (!property) {
      return next({ status: 404, message: 'Property not found' });
    }

    if (
      req.user.role !== 'admin' &&
      property.owner.toString() !== req.user.id
    ) {
      return next({ status: 403, message: 'Forbidden' });
    }

    await property.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};


// ✏️ UPDATE (🔥 теж важливо)
export const updateProperty = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!isValidId(id)) {
      return next({ status: 400, message: 'Invalid ID' });
    }

    const property = await PropertyModel.findById(id);

    if (!property) {
      return next({ status: 404, message: 'Property not found' });
    }

    if (
      req.user.role !== 'admin' &&
      property.owner.toString() !== req.user.id
    ) {
      return next({ status: 403, message: 'Forbidden' });
    }

    const files = req.files as Express.Multer.File[];

    let newImages: string[] = [];

    if (files && files.length > 0) {
      newImages = await Promise.all(files.map(uploadToCloudinary));
    }

    const existingImages = []
      .concat(req.body.existingImages || [])
      .filter(Boolean);

    property.set({
      title: req.body.title,
      price: Number(req.body.price) || 0,
      location: req.body.location,
      images: [...existingImages, ...newImages], // 🔥 combine
    });

    await property.save();

    res.json(property);
  } catch (error) {
    next(error);
  }
};


// 📥 МОЇ
export const getMyProperties = async (req, res, next) => {
  try {
    const properties = await PropertyModel.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    next(error);
  }
};