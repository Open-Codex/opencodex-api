import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma.util';
import { getUserIdRequest } from '../utils/getUserIdRequest.util';

export const hasPermission = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userId = getUserIdRequest(req);
    const projectId = req.params.projectId || req.body.projectId;

    if (!userId || !projectId) {
        res.status(400).json({ message: 'User or project not specified' });
        return;
    }

    const membership = await prisma.membership.findFirst({
        where: {
            userId: userId!,
            projectId,
        }
    });

    if (!membership || !['ADMIN', 'MODERATOR'].includes(membership.permission)) {
        res.status(403).json({ message: 'Forbidden: Requires ADMIN or MODERATOR permission' });
        return;
    }

    next();
};
