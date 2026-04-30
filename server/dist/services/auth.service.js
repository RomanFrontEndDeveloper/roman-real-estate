"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const register = async (email, password) => {
    const existingUser = await user_model_1.UserModel.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await user_model_1.UserModel.create({
        email,
        password: hashedPassword,
        role: 'agent',
    });
    return user;
};
exports.register = register;
// 🔐 LOGIN
const login = async (email, password) => {
    const user = await user_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password); //Чи пароль, який ввів користувач, співпадає з тим, що збережений у базі
    if (!isMatch) {
        throw new Error('Invalid password');
    }
    //Це створення JWT-токена через jsonwebtoken — ключовий момент логіну.
    const token = jsonwebtoken_1.default.sign(
    //jwt.sign = “зробити токен, який підтверджує, хто користувач”
    {
        id: user._id,
        role: user.role,
    }, 'SECRET_KEY', //“пароль сервера”, який підтверджує, що токен справжній
    { expiresIn: '7d' });
    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
        },
    };
};
exports.login = login;
