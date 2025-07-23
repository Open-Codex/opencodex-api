import { getDefaultRole } from '../utils/getDefaultRole.util';
import prisma from '../utils/prisma.util';
import { createMembership } from './membership.service';

export const createProjectService = async (name: string, description: string, creatorId: string) => {
    const project = await prisma.project.create({
        data: {
            name,
            description,
            creatorId,
        }
    });

    const defaultRole = await getDefaultRole();

    await createMembership({
        userId: creatorId,
        projectId: project.id,
        roleId: defaultRole,
        permission: 'ADMIN',
    });

    return project;
};

export const getAllProjectsService = async () => {
    return await prisma.project.findMany({
        include: {
            creator: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                    name: true,
                    discordId: true,
                    avatarUrl: true,
                },
            },
            category: { select: { name: true, description: true } },
            requiredSkills: { include: { skill: true } },
            memberships: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            github: true,
                            lastLogin: true,
                        }
                    },
                    role: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    permission: true,
                    joinedAt: true,
                },
            },
        }
    });
};

export const getProjectByIdService = async (id: string) => {
    return await prisma.project.findUnique({
        where: { id },
        include: {
            creator: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                    name: true,
                    discordId: true,
                    avatarUrl: true,
                },
            },
            category: { select: { name: true, description: true } },
            requiredSkills: { include: { skill: true } },
            memberships: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            github: true,
                            lastLogin: true,
                        }
                    },
                    role: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    permission: true,
                    joinedAt: true,
                },
            },
        }
    });
};

export const updateProjectService = async (projectId: string, userId: string, data: Partial<{
    name: string;
    description: string;
    readme: string
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
}>) => {
    const membership = await prisma.membership.findUnique({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
    });

    if (!membership || (membership.permission !== 'ADMIN' && membership.permission !== 'MODERATOR')) {
        throw new Error('Forbidden');
    };

    const updated = await prisma.project.update({
        where: { id: projectId },
        data,
    });

    return updated;
};

export const updatePermissionService = async (
    projectId: string,
    targetUserId: string,
    requestingUserId: string,
    newPermission: 'ADMIN' | 'MODERATOR' | 'MEMBER'
) => {
    const membership = await prisma.membership.findUnique({
        where: {
            userId_projectId: {
                userId: requestingUserId,
                projectId,
            },
        },
    });

    if (!membership || membership.permission !== 'ADMIN') {
        throw new Error('FORBIDDEN');
    };

    if (targetUserId === requestingUserId) {
        throw new Error('CANNOT_CHANGE_OWN_PERMISSION');
    };

    const targetMembership = await prisma.membership.findUnique({
        where: {
            userId_projectId: {
                userId: targetUserId,
                projectId,
            },
        },
    });

    if (!targetMembership) {
        throw new Error('MEMBER_NOT_FOUND');
    };

    return await prisma.membership.update({
        where: {
            userId_projectId: {
                userId: targetUserId,
                projectId,
            },
        },
        data: {
            permission: newPermission,
        },
    });
};

export const removeProjectMemberService = async (projectId: string, targetUserId: string, requestingUserId: string) => {
    const membership = await prisma.membership.findUnique({
        where: {
            userId_projectId: {
                userId: requestingUserId,
                projectId,
            },
        },
    });

    if (!membership || (membership.permission !== 'ADMIN' && membership.permission !== 'MODERATOR')) {
        throw new Error('FORBIDDEN');
    };

    if (targetUserId === requestingUserId) {
        throw new Error('CANNOT_REMOVE_SELF');
    };

    const targetMembership = await prisma.membership.findUnique({
        where: {
            userId_projectId: {
                userId: targetUserId,
                projectId,
            },
        },
    });

    if (!targetMembership) {
        throw new Error('MEMBER_NOT_FOUND');
    };

    // elimina membership
    await prisma.membership.delete({
        where: {
            userId_projectId: {
                userId: targetUserId,
                projectId,
            },
        },
    });

    // elimina joinRequest aceptado previamente
    await prisma.joinRequest.delete({
        where: {
            userId_projectId: {
                userId: targetUserId,
                projectId,
            },
        },
    });

    return { success: true};
};

export const leaveProjectService = async (
    projectId: string,
    userId: string
) => {
    const membership = await prisma.membership.findUnique({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
    });

    if (!membership) {
        throw new Error('NOT_A_MEMBER');
    }

    if (membership.permission === 'ADMIN') {
        throw new Error('ADMIN_CANNOT_LEAVE');
    }

    // elimina membership
    await prisma.membership.delete({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
    });

    // elimina joinRequest aceptado previamente
    await prisma.joinRequest.delete({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
    });

    return { success: true };
};

export const updateProjectCategoryService = async (projectId: string, categoryId: string) => {
    return await prisma.project.update({
        where: { id: projectId },
        data: { categoryId },
    });
};