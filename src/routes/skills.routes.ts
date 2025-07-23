import { Router } from 'express';
import { createSkill, getSkill } from '../controllers/skills.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const router = Router();

router.post("/", authenticateToken, isAdmin, createSkill);
router.get("/", getSkill);

export default router;