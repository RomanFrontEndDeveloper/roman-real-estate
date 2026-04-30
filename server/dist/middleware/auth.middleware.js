"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, 'SECRET_KEY');
        // 💾 кладемо user в req
        req.user = decoded; // “Збережи дані користувача всередині запиту”
        // req.user = {
        // 	id: '123',
        // 	role: 'user',
        // };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.verifyToken = verifyToken;
