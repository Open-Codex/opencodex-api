import { Router } from 'express';
import { createSkill, getSkill, updateSkill } from '../controllers/skills.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const router = Router();

router.post("/", authenticateToken, isAdmin, createSkill);
router.get("/", getSkill);
router.put("/:id", authenticateToken, isAdmin, updateSkill);

export default router;