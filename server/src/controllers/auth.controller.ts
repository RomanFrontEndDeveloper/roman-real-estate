import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await authService.register(email, password);

		const userWithoutPassword = {
			_id: user._id,
			email: user.email,
			role: user.role,
		};

		res.status(201).json(userWithoutPassword);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
};
