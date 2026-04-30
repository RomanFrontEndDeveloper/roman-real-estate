"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path")); // робота з файловою системою (шлях до папок)
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
exports.app = (0, express_1.default)();
// 🔹 Middlewares
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// 🔹 Static files
exports.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// 🔹 Routes
exports.app.use('/api/properties', property_routes_1.default); //Ти “підключаєш” роутер propertyRoutes до базового URL
exports.app.use('/api/auth', auth_routes_1.default);
exports.app.use('/api/users', user_routes_1.default);
// 🔹 Test route
exports.app.get('/', (req, res) => {
    res.send('API is working 🚀');
});
// 🔥 ERROR HANDLER — завжди ОСТАННІЙ
exports.app.use(error_middleware_1.errorHandler);
