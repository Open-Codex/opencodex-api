import { Router } from 'express';
import { createJoinRequest, getJoinRequestsByProject, updateJoinRequestStatus, deleteJoinRequest } from '../controllers/joinRequest.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { isProjectAdminOrModerator } from '../middlewares/isProjectAdminOrModerator.middleware';

const router = Router();

router.post("/", authenticateToken, createJoinRequest);
router.get("/:projectId", authenticateToken, isProjectAdminOrModerator, getJoinRequestsByProject);
router.put("/:requestId", authenticateToken, isProjectAdminOrModerator, updateJoinRequestStatus);
router.delete("/:requestId", authenticateToken, isProjectAdminOrModerator, deleteJoinRequest);

export default router;