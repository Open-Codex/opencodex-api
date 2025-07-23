import prisma from '../utils/prisma.util';

export const getUserByIdService = async (id: string) => {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            username: true,
            name: true,
            description: true,
            github: true,
            linkedin: true,
            twitter: true,
            website: true,
            status: true,
            userRol: true,
            avatarUrl: true,
            registeredAt: true,
            lastLogin: true,
            likesReceived: true,
            dislikesReceived: true,
            userSkills: {
                select: {
                    skill: true,
                }
            },
            memberships: {
                select: {
                    project: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                            status: true,
                        }
                    },
                    permission: true,
                    role: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    joinedAt: true,
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
            description: true,
            github: true,
            linkedin: true,
            twitter: true,
            website: true,
            status: true,
            userRol: true,
            avatarUrl: true,
            registeredAt: true,
            lastLogin: true,
            likesReceived: true,
            dislikesReceived: true,
            userSkills: {
                select: {
                    skill: true,
                }
            },
            memberships: {
                select: {
                    project: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                            status: true,
                        }
                    },
                    permission: true,
                    role: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    joinedAt: true,
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

export const updateUserService = async (id: string, data: Partial<{
    name: string;
    description: string;
    github: string,
    linkedin: string;
    twitter: string;
    website: string;
}>) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};