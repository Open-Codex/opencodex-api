import { Router } from 'express';
import { createVacancy, updateVacancy, deleteVacancy, getAllVacancies, getVacanciesByProject } from '../controllers/vacancy.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { hasPermission } from '../middlewares/hasPermission.middleware';

const router = Router();

router.get('/', getAllVacancies);
router.get('/project/:projectId', getVacanciesByProject)
router.post("/", authenticateToken, hasPermission, createVacancy);
router.put("/:id", authenticateToken, hasPermission, updateVacancy);
router.delete("/:id", authenticateToken, hasPermission, deleteVacancy);

export default router;