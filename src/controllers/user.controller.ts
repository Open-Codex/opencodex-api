import { Request, Response } from 'express';
import { addUserSkillService, getUserByIdService, getUserByUsernameService, removeUserSkillService } from '../services/user.service';
import { AuthRequest } from '../types/index'

export const getMe = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized: No user ID" });
        return;
    }

    try {
        const user = await getUserByIdService(userId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        return;
    }
};

export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await getUserByUsernameService(username);
        if (!user) res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch {
        res.status(500).json({ message: "Error retrieving user" });
    }
};

export const addSkillUser = async (req: AuthRequest, res: Response) => {
    const { skillId } = req.body;
    if (!skillId) res.status(400).json({ message: 'skillId is required' });

    try {
        const newSkill = await addUserSkillService(req.user!.id, skillId);
        res.status(201).json(newSkill);
    } catch (error) {
        if (error instanceof Error && error.message === 'SKILL_EXISTS') {
            res.status(409).json({ message: 'Skill already added' });
        } else {
            res.status(500).json({ message: 'Error adding skill' });
        }
    }
};

export const removeUserSkill = async (req: AuthRequest, res: Response) => {
    const { skillId } = req.params;

    try {
        await removeUserSkillService(req.user!.id, skillId);
        res.status(204).send();
    } catch {
        res.status(500).json({ message: 'Error deleting skill' });
    }
};