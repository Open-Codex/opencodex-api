import { Router } from 'express';
import { createProject, getAllProjects, getProjectById, removeProjectMember, updatePermission, updateProject } from '../controllers/project.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post("/", authenticateToken, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", authenticateToken, updateProject);

router.put("/:id/members/:userId/permission", authenticateToken, updatePermission);

router.delete("/:id/members/:userId", authenticateToken, removeProjectMember);

export default router;