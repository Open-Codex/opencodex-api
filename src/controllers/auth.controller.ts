import { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

    try {
        const result = await registerUserService(name, username, email, password)
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const result = await loginUserService(username, password);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}