import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

// 👉 Контролер реєстрації користувача
export const register = async (req: Request, res: Response) => {
	try {
		// 📥 Отримуємо дані з тіла запиту (з фронтенду)
		const { email, password } = req.body;

		// ⚙️ Викликаємо сервіс (там логіка: перевірка + хеш + створення)
		const user = await authService.register(email, password);

		// 🚫 НЕ віддаємо пароль клієнту (навіть захешований!)
		const userWithoutPassword = {
			_id: user._id, // унікальний id з MongoDB
			email: user.email, // email користувача
			role: user.role, // роль (admin / agent)
		};

		// 📤 Відправляємо відповідь клієнту
		// 201 = Created (успішно створено ресурс)
		res.status(201).json(userWithoutPassword);
	} catch (error: any) {
		// ❌ Якщо сталася помилка (наприклад user вже існує)
		// повертаємо 400 і повідомлення
		res.status(400).json({ message: error.message });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const data = await authService.login(email, password);
		res.json(data);
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};
