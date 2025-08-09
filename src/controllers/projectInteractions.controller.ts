import { Request, Response } from "express";
import { projectInteractionService } from "../services/projectInteractions.service";

export const toggleProjectInteraction = async (req: Request, res: Response) => {
    try {
        const { projectId, type } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        if (!projectId || (type !== "like" && type !== "favorite")) {
            res.status(400).json({ error: "projectId and valid type are required" });
            return;
        }

        const result = await projectInteractionService({ userId, projectId, type });
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};