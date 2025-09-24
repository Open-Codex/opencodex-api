import { Request, Response } from 'express';
import { createSkillService, getSkillService, updateSkillService } from '../services/skills.service';

export const createSkill = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const skill = await createSkillService(name);
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ error: 'Error create Skill' });
    }
};

export const getSkill = async (req: Request, res: Response) => {
    try {
        const skill = await getSkillService();

        res.json(skill);
    } catch (error) {
        res.status(500).json({ error: 'Error get Skill' });
    }
}

export const updateSkill = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ error: 'Name is required' });
        }

        const updatedSkill = await updateSkillService(id, name);
        res.json(updatedSkill);
    } catch (error) {
        res.status(500).json({ error: 'Error updating Skill' });
    }
};