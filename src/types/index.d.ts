import { Request } from 'express';
import { UserRole } from '@prisma/client';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: UserRole;
        userRol: string;
    };
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: UserRole;
                userRol: string;
            };
        }
    }
}

export { };
