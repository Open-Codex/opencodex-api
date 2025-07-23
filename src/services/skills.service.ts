import prisma from '../utils/prisma.util';

export const createSkillService = async (name: string) => {
    return await prisma.skill.create({
        data: { name }
    });
};

export const getSkillService = async () => {
    return await prisma.skill.findMany();
};