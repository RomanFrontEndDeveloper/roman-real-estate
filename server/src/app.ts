import express, { Request, Response } from 'express';
import cors from 'cors';
import propertyRoutes from './routes/property.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

export const app = express();

// Middleware — це код, який виконується між request і response.
app.use(cors()); //дозволяє іншим сайтам (frontend) робити запити до backend.
app.use(express.json()); //дозволяє Express читати JSON із body request.

//це підключення routes (маршрутів) до Express. ти кажеш Express, де шукати обробники запитів.
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//якщо хтось відкриє /, повернути текст "API is working 🚀".
app.get('/', (req: Request, res: Response) => {
	res.send('API is working 🚀');
});

// 🔥 ERROR HANDLER — завжди ОСТАННІЙ
app.use(errorHandler);
