import express from 'express';
import cors from 'cors'; //CORS:Дозволяє фронтенду (напр. React) робити запити на backend
import propertyRoutes from './routes/property.routes'; //Підключаєш свої маршрути (routes)
import authRoutes from './routes/auth.routes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
	res.send('API is working 🚀');
});

//Middleware — це функція, яка виконується між запитом і відповіддю (наприклад cors або express.json)
