import { Router } from 'express';
import { canAccessProjectAdmin, createProject, getAllProjects, getProjectById, leaveProject, removeProjectMember, updatePermission, updateProject, updateProjectCategory } from '../controllers/projects.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const router = Router();

router.post("/", authenticateToken, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", authenticateToken, updateProject);

router.put("/:id/members/:userId/permission", authenticateToken, updatePermission);

router.delete("/:id/members/:userId", authenticateToken, removeProjectMember);
router.delete("/:id/leave", authenticateToken, leaveProject);

// TODO move this endpoint to an Admin Routes
router.put("/category/change", authenticateToken, isAdmin, updateProjectCategory);
router.get('/:id/can-admin', authenticateToken, canAccessProjectAdmin);

export default router;