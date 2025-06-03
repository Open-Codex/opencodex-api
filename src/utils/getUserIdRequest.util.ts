import { Request } from 'express';

export const getUserIdRequest = (req: Request): string => {
    const user = req.user as { id: string };
    return user.id;
};