import { Request, Response } from 'express';
import { createRoleService, getRoleService } from '../services/role.service';
export const createRole = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const role = await createRoleService(name);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: 'Error create Role' });
    }
};

export const getRole = async (req: Request, res: Response) => {
    try {
        const role = await getRoleService();

        res.json(role);
    } catch (error) {
        res.status(500).json({ error: 'Error get Role' });
    }
}