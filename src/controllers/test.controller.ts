import { Request, Response } from 'express';

export const getTest = async (req: Request, res: Response): Promise<void> => {
    try {
        res.send('Hello World');
    } catch (error) {
        console.error('Error get Test', error);
        res.status(500).json({ error: 'Error Test' });
    }
}