import { app } from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
	await connectDB();

	// 🔥 ГЛОБАЛЬНИЙ ERROR HANDLER
	app.use((err: any, req: any, res: any, next: any) => {
		console.error('❌ GLOBAL ERROR:', err);
		res.status(500).json({ message: err.message });
	});

	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
};

start();
