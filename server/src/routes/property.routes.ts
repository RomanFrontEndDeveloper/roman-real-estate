import { Router } from 'express';
import * as controller from '../controllers/property.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.get('/', controller.getProperties);
router.get('/my', verifyToken, controller.getMyProperties);
router.get('/:id', controller.getPropertyById);

// 🔐 захищені
router.post('/', verifyToken, controller.createProperty);
router.patch('/:id', verifyToken, controller.updateProperty);
router.delete('/:id', verifyToken, controller.deleteProperty);
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
	const file = req.file;

	if (!file) {
		return res.status(400).json({ message: 'No file' });
	}

	res.json({
		imageUrl: `http://localhost:5000/uploads/${file.filename}`,
	});
});

export default router;

//Middleware — це функція, яка виконується МІЖ запитом і відповіддю
