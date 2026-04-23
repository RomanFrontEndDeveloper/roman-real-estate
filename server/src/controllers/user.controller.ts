import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const toggleFavorite = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user!.id;
		const { propertyId } = req.body;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isFavorite = user.favorites.includes(propertyId);

		if (isFavorite) {
			// ❌ remove
			user.favorites = user.favorites.filter((id) => id !== propertyId);
		} else {
			// ❤️ add
			user.favorites.push(propertyId);
		}

		await user.save();

		res.json(user.favorites);
	} catch (error) {
		console.error('TOGGLE FAVORITE ERROR:', error);
		res.status(500).json({ message: 'Server error' });
	}
};
