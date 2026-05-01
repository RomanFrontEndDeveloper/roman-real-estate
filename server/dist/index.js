'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const app_1 = require('./app');
const db_1 = require('./config/db');
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const PORT = process.env.PORT || 10000;
const start = async () => {
	try {
		await (0, db_1.connectDB)();
		app_1.app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('❌ Failed to start server:', error);
		process.exit(1);
	}
};
start();
