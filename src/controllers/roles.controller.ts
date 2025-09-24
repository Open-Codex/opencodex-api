import { Request, Response } from 'express';
import { createRoleService, getRoleService, updateRoleService } from '../services/roles.service';
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

export const updateRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ error: 'Name is required' });
        }

        const updatedRole = await updateRoleService(id, name);
        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: 'Error updating Role' });
    }
};