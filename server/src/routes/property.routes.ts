import { Router } from 'express';
import * as controller from '../controllers/property.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.post(
	'/',
	verifyToken,
	upload.array('images', 10),
	controller.createProperty,
);

router.get('/', controller.getProperties);
router.get('/my', verifyToken, controller.getMyProperties);
router.get('/:id', controller.getPropertyById);

router.patch(
	'/:id',
	verifyToken,
	upload.array('images', 10),
	controller.updateProperty,
);

router.delete('/:id', verifyToken, controller.deleteProperty);

export default router;
