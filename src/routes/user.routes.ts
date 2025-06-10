import { Router } from 'express';
import { addSkillUser, getMe, getUserByUsername, removeUserSkill } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get("/me", authenticateToken, getMe);
router.get("/:username", getUserByUsername);

// userSkills integrated
router.post("/me/skills", authenticateToken, addSkillUser);
router.get("/me/skills:skillId", authenticateToken, removeUserSkill);

export default router;