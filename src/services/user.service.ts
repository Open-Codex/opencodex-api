import prisma from '../utils/prisma.util';

export const getUserByIdService = async (id: string) => {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            username: true,
            name: true,
            userRol: true,
            avatarUrl: true,
            registeredAt: true,
            userSkills: {
                select: {
                    skill: true,
                }
            }
        },
    });
};

export const getUserByUsernameService = async (username: string) => {
    return prisma.user.findFirst({
        where: { username },
        select: {
            id: true,
            email: true,
            username: true,
            name: true,
            userRol: true,
            avatarUrl: true,
            registeredAt: true,
            userSkills: {
                select: {
                    skill: true,
                }
            }
        }
    });
};

export const addUserSkillService = async (userId: string, skillId: string) => {
    const exists = await prisma.userSkill.findUnique({
        where: { userId_skillId: { userId, skillId } },
    });

    if (exists) {
        throw new Error('SKILL_EXISTS');
    }

    return prisma.userSkill.create({
        data: { userId, skillId },
    });
};

export const removeUserSkillService = async (userId: string, skillId: string) => {
    return prisma.userSkill.delete({
        where: { userId_skillId: { userId, skillId } },
    });
};