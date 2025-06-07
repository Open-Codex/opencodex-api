import { Request, Response } from 'express';
import { createVacancyService, addSkillsToVacancyService, updateVacancyService, deleteVacancyService, getAllVacanciesService, getVacanciesByProjectService } from '../services/vacancy.service';

export const getAllVacancies = async (_req: Request, res: Response) => {
    const vacancies = await getAllVacanciesService();
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
