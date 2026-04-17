import { Router } from 'express';
// Імпортуємо Router з Express — це інструмент для створення маршрутів (routes)

import * as authController from '../controllers/auth.controller';
// Імпортуємо ВСІ функції з auth.controller
// Наприклад: authController.register

const router = Router();
// Створюємо новий router — окремий "міні-сервер" для auth (логін, реєстрація і т.д.)

router.post('/register', authController.register);
// Коли приходить POST запит на /register → викликається authController.register

// Тобто:
// POST /api/auth/register
// → йде сюди
// → потім викликається controller
// → controller викликає service
// → service працює з БД

export default router;
// Експортуємо router, щоб підключити його в app.ts:
// app.use('/api/auth', authRoutes);
