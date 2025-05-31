import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    user?: {
        userRol: string;
    }
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.userRol === 'ADMIN') return next();
    res.status(403).json({ error: 'Forbidden: Admins only' });
    return;
};