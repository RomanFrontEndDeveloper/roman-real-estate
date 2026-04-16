import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		location: { type: String, required: true },
		image: { type: String, required: true },
	},
	{
		timestamps: true, //автоматичний контроль часу створення і оновлення документа
	},
);

export const PropertyModel = mongoose.model('Property', propertySchema);
