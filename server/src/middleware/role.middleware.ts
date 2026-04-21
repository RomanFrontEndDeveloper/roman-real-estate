import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const checkRole = (role: 'admin' | 'agent') => {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		if (req.user.role !== role) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		next();
	};
};

// Це middleware для перевірки ролі користувача.
// Воно працює після авторизації, перевіряє наявність req.user і відповідність ролі.
// Якщо користувач не авторизований — повертає 401, якщо не має прав — 403.
// Реалізовано як factory-функція для гнучкого використання з різними ролями.
