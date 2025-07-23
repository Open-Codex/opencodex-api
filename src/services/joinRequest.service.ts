import { getDefaultRole } from '../utils/getDefaultRole.util';
import prisma from '../utils/prisma.util';
import { createMembership } from './memberships.service';

export const createJoinRequestService = async (userId: string, projectId: string, message?: string) => {
    return await prisma.joinRequest.create({
        data: {
            userId,
            projectId,
            message,
        }
    });
};

export const getJoinRequestsByProjectService = async (projectId: string) => {
    return await prisma.joinRequest.findMany({
        where: { projectId },
        include: {
            user: { select: {
                id: true,
                username: true,
                avatarUrl: true
            } }
        },
    });
};

export const updateJoinRequestStatusService = async (requestId: string, status: 'ACCEPTED' | 'REJECTED') => {
    const joinRequest = await prisma.joinRequest.update({
        where: { id: requestId },
        data: {
            status,
            reviewedAt: new Date(),
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                }
            },
            project: {
                select: {
                    id: true,
                    name: true,
                }
            },
        },
    });

    if (status === 'ACCEPTED') {
        const existingMembership = await prisma.membership.findUnique({
            where: {
                userId_projectId: {
                    userId: joinRequest.userId,
                    projectId: joinRequest.projectId,
                },
            },
        });

        if (!existingMembership) {
            const defaultRole = await getDefaultRole();

            await createMembership({
                userId: joinRequest.userId,
                projectId: joinRequest.projectId,
                roleId: defaultRole,
                permission: 'MEMBER',
            });
        };
    };

    return joinRequest;
};

export const deleteJoinRequestService = async (requestId: string) => {
    return await prisma.joinRequest.delete({
        where: { id: requestId },
    });
};