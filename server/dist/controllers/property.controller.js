"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProperties = exports.updateProperty = exports.deleteProperty = exports.createProperty = exports.getPropertyById = exports.getProperties = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const property_model_1 = require("../models/property.model");
// helper для перевірки ID
const isValidId = (id) => mongoose_1.default.Types.ObjectId.isValid(id);
// 📥 Отримати всі
const getProperties = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const filter = {};
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
            property_model_1.PropertyModel.countDocuments(filter),
            property_model_1.PropertyModel.find(filter)
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
    }
    catch (error) {
        next(error);
    }
};
exports.getProperties = getProperties;
// 📥 Отримати один
const getPropertyById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!isValidId(id)) {
            return next({ status: 400, message: 'Invalid ID' });
        }
        const property = await property_model_1.PropertyModel.findById(id);
        if (!property) {
            return next({ status: 404, message: 'Property not found' });
        }
        res.json(property);
    }
    catch (error) {
        next(error);
    }
};
exports.getPropertyById = getPropertyById;
// ➕ Створити
const createProperty = async (req, res, next) => {
    try {
        const files = req.files;
        const property = await property_model_1.PropertyModel.create({
            title: req.body.title,
            price: Number(req.body.price) || 0,
            location: req.body.location,
            images: files?.map((f) => f.path) || [],
            owner: req.user.id,
        });
        res.status(201).json(property);
    }
    catch (error) {
        next(error);
    }
};
exports.createProperty = createProperty;
// ❌ Видалити
const deleteProperty = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!isValidId(id)) {
            return next({ status: 400, message: 'Invalid ID' });
        }
        const property = await property_model_1.PropertyModel.findById(id);
        if (!property) {
            return next({ status: 404, message: 'Property not found' });
        }
        if (req.user.role !== 'admin' &&
            property.owner.toString() !== req.user.id) {
            return next({ status: 403, message: 'Forbidden' });
        }
        await property.deleteOne();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProperty = deleteProperty;
// ✏️ Оновити
const updateProperty = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!isValidId(id)) {
            return next({ status: 400, message: 'Invalid ID' });
        }
        const property = await property_model_1.PropertyModel.findById(id);
        if (!property) {
            return next({ status: 404, message: 'Property not found' });
        }
        if (req.user.role !== 'admin' &&
            property.owner.toString() !== req.user.id) {
            return next({ status: 403, message: 'Forbidden' });
        }
        const files = req.files;
        const existingImages = []
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
    }
    catch (error) {
        next(error);
    }
};
exports.updateProperty = updateProperty;
// 📥 Мої оголошення
const getMyProperties = async (req, res, next) => {
    try {
        const properties = await property_model_1.PropertyModel.find({
            owner: req.user.id,
        }).sort({ createdAt: -1 });
        res.json(properties);
    }
    catch (error) {
        next(error);
    }
};
exports.getMyProperties = getMyProperties;
// Це middleware для перевірки JWT.
// Я беру токен із заголовка Authorization, перевіряю його через jwt.verify, і якщо він валідний — додаю payload у req.user.
// Якщо токен відсутній або неправильний — повертаю 401.
