import { Request, Response } from 'express';
import { createProjectService, getAllProjectsService, getProjectByIdService, updateProjectService } from '../services/project.service';
import { getUserIdRequest } from '../utils/getUserIdRequest.util';

export const createProject = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const creatorId = getUserIdRequest(req);

    if (!name || !description) {
        res.status(400).json({ error: 'Name and Description are required' });
    };

    try {
        const project = await createProjectService(name, description, creatorId);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Project' });
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    const projects = await getAllProjectsService();
    res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await getProjectByIdService(id);

    if (!project) {
        res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
};

export const updateProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    const userId = getUserIdRequest(req);
    const { name, description } = req.body;

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
    };

    try {
        const updated = await updateProjectService(projectId, userId, name, description);
        res.status(200).json(updated);
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
};