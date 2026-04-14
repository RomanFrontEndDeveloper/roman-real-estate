import mongoose from 'mongoose';

export interface Property {
	id: string;
	title: string;
	price: number;
	location: string;
	image: string;
	createdAt: Date;
}

const propertySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	},
);

export const PropertyModel = mongoose.model('Property', propertySchema);
