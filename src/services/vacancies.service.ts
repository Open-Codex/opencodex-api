import prisma from '../utils/prisma.util';

export const getAllVacanciesService = async () => {
    return await prisma.vacancy.findMany({
        where: { isFilled: false },
        include: {
            project: {
                select: { id: true, name: true }
            },
            requiredSkills: {
                include: { skill: true }
            }
        }
    });
};

export const getVacanciesByProjectService = async (projectId: string) => {
    return await prisma.vacancy.findMany({
        where: { projectId },
        include: {
            requiredSkills: {
                include: { skill: true }
            }
        }
    });
};

export const createVacancyService = async ({ projectId, title, description }: { projectId: string, title: string, description: string }) => {
    return await prisma.vacancy.create({
        data: {
            projectId,
            title,
            description,
        }
    });
};

export const addSkillsToVacancyService = async (vacancyId: string, skillIds: string[]) => {
    const data = skillIds.map(skillId => ({
        vacancyId,
        skillId,
    }));
    return await prisma.vacancySkill.createMany({ data, skipDuplicates: true });
};

export const updateVacancyService = async (id: string, data: { title?: string, description?: string, isFilled?: boolean }) => {
    return await prisma.vacancy.update({
        where: { id },
        data,
    });
};

export const deleteVacancyService = async (id: string) => {
    return await prisma.vacancy.delete({ where: { id } });
};
