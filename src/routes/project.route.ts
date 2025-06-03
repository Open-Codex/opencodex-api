import { Router } from 'express';
import { createProject, getAllProjects, getProjectById, updateProject } from '../controllers/project.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post("/", authenticateToken, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", authenticateToken, updateProject);

export default router;