"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const propertySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    images: { type: [String], default: [] },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true, //автоматичний контроль часу створення і оновлення документа
});
exports.PropertyModel = mongoose_1.default.model('Property', propertySchema);
