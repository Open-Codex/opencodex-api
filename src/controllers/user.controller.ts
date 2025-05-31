import { Request, Response } from 'express';
import { getUserByIdService } from '../services/user.service';

export const getMe = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

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