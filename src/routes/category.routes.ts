import { Router } from 'express';
import { getCategories, createCategory, updateCategory } from '../controllers/category.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const router = Router();

router.get("/", getCategories);
router.post("/", authenticateToken, isAdmin, createCategory);
router.put("/:id", authenticateToken, isAdmin, updateCategory);
//router.delete('/:id', categoryController.deleteCategory);

export default router;