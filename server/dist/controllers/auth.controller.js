"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
// 👉 Контролер реєстрації користувача
const register = async (req, res) => {
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
    }
    catch (error) {
        // ❌ Якщо сталася помилка (наприклад user вже існує)
        // повертаємо 400 і повідомлення
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.json(data);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.login = login;
