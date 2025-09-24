import { Router } from 'express';
import { createRole, getRole, updateRole } from '../controllers/roles.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const router = Router();

router.post("/", authenticateToken, isAdmin, createRole);
router.get("/", getRole);
router.put("/:id", authenticateToken, isAdmin, updateRole);

export default router;