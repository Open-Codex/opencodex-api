import { Request, Response } from 'express';
import { createVacancyService, addSkillsToVacancyService, updateVacancyService, deleteVacancyService, getAllVacanciesService, getVacanciesByProjectService, removeSkillsFromVacancyService } from '../services/vacancies.service';

export const getAllVacancies = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const vacancies = await getAllVacanciesService(page, limit);
    res.status(200).json(vacancies);
};

export const getVacanciesByProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const vacancies = await getVacanciesByProjectService(projectId);
    res.status(200).json(vacancies);
};

export const createVacancy = async (req: Request, res: Response) => {
    const { title, description, skillIds, projectId } = req.body;

    const vacancy = await createVacancyService({ projectId, title, description });

    if (skillIds && skillIds.length > 0) {
        await addSkillsToVacancyService(vacancy.id, skillIds);
    }

    res.status(201).json(vacancy);
};

export const updateVacancy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, isFilled } = req.body;

    const updated = await updateVacancyService(id, { title, description, isFilled });

    res.status(200).json(updated);
};

export const deleteVacancy = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteVacancyService(id);
    res.status(204).send();
};

export const addSkillsToVacancy = async (req: Request, res: Response) => {
    const { id } = req.params; // vacancyId
    const { skillIds } = req.body; // array de string

    if (!skillIds || !Array.isArray(skillIds) || skillIds.length === 0) {
        res.status(400).json({ message: "skillIds is required and should be an array" });
    }

    const result = await addSkillsToVacancyService(id, skillIds);
    res.status(200).json(result);
};

export const removeSkillsFromVacancy = async (req: Request, res: Response) => {
    const { id } = req.params; // vacancyId
    const { skillIds } = req.body;

    if (!skillIds || !Array.isArray(skillIds) || skillIds.length === 0) {
        res.status(400).json({ message: "skillIds is required and should be an array" });
    }

    const result = await removeSkillsFromVacancyService(id, skillIds);
    res.status(200).json(result);
};
