import { Router } from 'express';
import { createRole, getRole } from '../controllers/roles.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const router = Router();

router.post("/", authenticateToken, isAdmin, createRole);
router.get("/", getRole);

export default router;