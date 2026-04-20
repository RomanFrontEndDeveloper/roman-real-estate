import { Router } from 'express';
import * as controller from '../controllers/property.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', controller.getProperties);
router.get('/:id', controller.getPropertyById);

// 🔐 захищені
router.post('/', verifyToken, controller.createProperty);
router.patch('/:id', verifyToken, controller.updateProperty);
router.delete('/:id', verifyToken, controller.deleteProperty);

export default router;

//Middleware — це функція, яка виконується МІЖ запитом і відповіддю
