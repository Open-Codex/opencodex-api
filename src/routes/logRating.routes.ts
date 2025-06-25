import { Router } from 'express';
import { rateUser } from '../controllers/logRating.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, rateUser);

export default router;
