import { Router } from 'express';
import * as controller from '../controllers/property.controller';

const router = Router();

router.get('/', controller.getProperties);
router.get('/:id', controller.getPropertyById);
router.post('/', controller.createProperty);
router.patch('/:id', controller.updateProperty);
router.delete('/:id', controller.deleteProperty);

export default router;
