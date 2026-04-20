import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export const register = async (email: string, password: string) => {
	const existingUser = await UserModel.findOne({ email });

	if (existingUser) {
		throw new Error('User already exists');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await UserModel.create({
		email,
		password: hashedPassword,
	});

	return user;
};

// 🔐 LOGIN
export const login = async (email: string, password: string) => {
	const user = await UserModel.findOne({ email });

	if (!user) {
		throw new Error('User not found');
	}

	const isMatch = await bcrypt.compare(password, user.password); //Чи пароль, який ввів користувач, співпадає з тим, що збережений у базі

	if (!isMatch) {
		throw new Error('Invalid password');
	}

	//Це створення JWT-токена через jsonwebtoken — ключовий момент логіну.
	const token = jwt.sign(
		//jwt.sign = “зробити токен, який підтверджує, хто користувач”
		{
			id: user._id,
			role: user.role,
		},
		'SECRET_KEY', //“пароль сервера”, який підтверджує, що токен справжній
		{ expiresIn: '7d' }, //7 днів
	);

	return {
		token,
		user: {
			id: user._id,
			email: user.email,
			role: user.role,
		},
	};
};
