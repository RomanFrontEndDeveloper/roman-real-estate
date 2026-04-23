import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { toggleFavorite } from '../controllers/user.controller';
import { AuthRequest } from '../middleware/auth.middleware';
import { Response } from 'express';
import { UserModel } from '../models/user.model';

const router = Router();

// ❤️ toggle favorite
router.post('/favorites', verifyToken, toggleFavorite);

// 👤 get me
router.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
	const user = await UserModel.findById(req.user!.id);
	res.json(user);
});

export default router;
