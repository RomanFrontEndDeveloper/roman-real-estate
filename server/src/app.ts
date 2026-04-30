import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path'; // робота з файловою системою (шлях до папок)

import propertyRoutes from './routes/property.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

export const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 🔹 Routes
app.use('/api/properties', propertyRoutes); //Ти “підключаєш” роутер propertyRoutes до базового URL
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 🔹 Test route
app.get('/', (req: Request, res: Response) => {
	res.send('API is working 🚀');
});

// 🔥 ERROR HANDLER — завжди ОСТАННІЙ
app.use(errorHandler);
