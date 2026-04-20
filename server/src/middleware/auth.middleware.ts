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
		const authHeader = req.headers.authorization; //Візьми токен, який клієнт передав у заголовках

		// ❌ якщо немає заголовка
		if (!authHeader) {
			return res.status(401).json({ message: 'No token provided' });
		}

		// 👉 "Bearer TOKEN"
		const token = authHeader.split(' ')[1]; //розбиває рядок по пробілу бере 2й елем

		if (!token) {
			return res.status(401).json({ message: 'Invalid token' });
		}

		// 🔐 перевіряємо токен
		const decoded = jwt.verify(token, 'SECRET_KEY') as {
			//'SECRET_KEY' - process.env.JWT_SECRET
			//перевіряє чи токен справжній
			id: string;
			role: string;
		};

		// 💾 кладемо user в req
		req.user = decoded; // “Збережи дані користувача всередині запиту”
		// req.user = {
		// 	id: '123',
		// 	role: 'user',
		// };

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};
