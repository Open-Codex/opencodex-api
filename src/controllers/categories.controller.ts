import { Request, Response } from 'express';
import { getCategoriesService, createCategoryService, updateCategoryService } from '../services/categories.service';

export const getCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await getCategoriesService();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error get Categories' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name) res.status(400).json({ error: 'Name is required' });
        if (!description) res.status(400).json({ error: 'Description is required' });
    
        const category = await createCategoryService(name, description);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error create Category' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if (!name) res.status(400).json({ error: 'Name is required' });
        if (!description) res.status(400).json({ error: 'Description is required' });
    
        const updated = await updateCategoryService(id, name, description);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error update Category' });
    }
};

/* 
export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteCategoryService(id);
    res.status(204).send();
};
*/
