import { Request, Response } from 'express';
import { getUserByIdService } from '../services/user.service';
import { AuthRequest } from '../types/authRequest';

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