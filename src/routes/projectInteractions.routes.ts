import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { toggleProjectInteraction } from '../controllers/projectInteractions.controller';

const router = Router();

router.post('/', authenticateToken, toggleProjectInteraction);

export default router;