import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client'; // Asegúrate de que esta importación sea correcta

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: UserRole;
        userRol: string;
    };
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.userRol === 'ADMIN') return next();
    res.status(403).json({ error: 'Forbidden: Admins only' });
    return;
};