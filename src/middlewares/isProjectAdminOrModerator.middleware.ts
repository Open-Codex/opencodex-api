import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma.util';
import { AuthRequest } from '../types';
import { getUserIdRequest } from '../utils/getUserIdRequest.util';

export const isProjectAdminOrModerator = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userId = getUserIdRequest(req);
    const { requestId, projectId } = req.params;

    let resolvedProjectId: string | undefined;

    // Si viene requestId resuelve el projectId desde la joinRequest
    if (requestId) {
        const joinRequest = await prisma.joinRequest.findUnique({
            where: { id: requestId },
            select: { projectId: true },
        });

        if (!joinRequest) {
            res.status(404).json({ error: 'Join request not found' });
            return;
        }

        resolvedProjectId = joinRequest.projectId;
    } else if (projectId) {
        // Si viene projectId directo
        resolvedProjectId = projectId;
    } else {
        res.status(400).json({ error: 'Missing projectId or requestId in parameters' });
        return;
    }

    const membership = await prisma.membership.findUnique({
        where: {
            userId_projectId: {
                userId: userId!,
                projectId: resolvedProjectId,
            },
        },
    });

    if (!membership || !['ADMIN', 'MODERATOR'].includes(membership.permission)) {
        res.status(403).json({ error: 'Forbidden: Requires ADMIN or MODERATOR permission' });
        return;
    }

    next();
};
