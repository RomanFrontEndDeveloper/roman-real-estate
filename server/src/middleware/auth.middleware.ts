import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
	user?: {
		id: string;
		role: string;
	};
}

export const verifyToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.headers.authorization;

		// ❌ якщо немає заголовка
		if (!authHeader) {
			return res.status(401).json({ message: 'No token provided' });
		}

		// 👉 "Bearer TOKEN"
		const token = authHeader.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Invalid token' });
		}

		// 🔐 перевіряємо токен
		const decoded = jwt.verify(token, 'SECRET_KEY') as {
			id: string;
			role: string;
		};

		// 💾 кладемо user в req
		req.user = decoded;

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};
