import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

export const register = async (email: string, password: string) => {
	// перевірка чи існує користувач
	const existingUser = await UserModel.findOne({ email });

	if (existingUser) {
		throw new Error('User already exists');
	}

	// хешуємо пароль
	const hashedPassword = await bcrypt.hash(password, 10);

	// створюємо користувача
	const user = await UserModel.create({
		email,
		password: hashedPassword,
	});

	return user;
};
