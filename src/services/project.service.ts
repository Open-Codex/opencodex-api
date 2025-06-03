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
            requiredSkills: { include: { skill: true } },
            memberships: true,
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
            requiredSkills: { include: { skill: true } },
            memberships: true,
        }
    });
};

export const updateProjectService = async (projectId: string, userId: string, name: string, description: string) => {
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
        data: {
            name,
            description,
        },
    });

    return updated;
};