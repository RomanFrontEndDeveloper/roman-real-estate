import express from 'express';
import cors from 'cors'; //CORS:Дозволяє фронтенду (напр. React) робити запити на backend
import propertyRoutes from './routes/property.routes'; //Підключаєш свої маршрути (routes)
import authRoutes from './routes/auth.routes';

export const app = express();

app.use(cors()); //дозволяє фронтенду звертатись до бекенду
app.use(express.json()); //middleware, який парсить JSON.
app.use('/api/properties', propertyRoutes); //підключення роутів для нерухомості.
app.use('/api/auth', authRoutes); //підключення роутів для авторизації

app.get('/', (req, res) => {
	res.send('API is working 🚀');
}); //Коли хтось заходить на головну адресу сервера (/) через GET-запит — сервер відповідає текстом.

//Middleware — це функція, яка виконується між запитом і відповіддю (наприклад cors або express.json)
