import { Request, Response } from 'express';
import { rateUserService } from '../services/logRatings.service';

export const rateUser = async (req: Request, res: Response) => {
    try {
        const { toUserId, isLike } = req.body;
        const fromUserId = req.user?.id; // Asumiendo que usas auth middleware

        if (!fromUserId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (!toUserId || typeof isLike !== 'boolean') {
            res.status(400).json({ error: 'toUserId and isLike are required' });
            return;
        }

        const result = await rateUserService({ fromUserId, toUserId, isLike });
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
