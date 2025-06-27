import { Router } from 'express';
import { addSkillUser, getMe, getUserByUsername, removeUserSkill, updateUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get("/me", authenticateToken, getMe);
router.get("/:username", getUserByUsername);
router.put("/me", authenticateToken, updateUser);

// userSkills integrated
router.post("/me/skills", authenticateToken, addSkillUser);
router.get("/me/skills:skillId", authenticateToken, removeUserSkill);

export default router;