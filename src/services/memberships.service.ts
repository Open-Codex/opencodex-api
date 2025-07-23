import prisma from '../utils/prisma.util';

interface CreateMembershipParams {
    userId: string;
    projectId: string;
    roleId: string;
    permission?: 'ADMIN' | 'MODERATOR' | 'MEMBER';
};

export const createMembership = async ({
    userId,
    projectId,
    roleId,
    permission = 'MEMBER',
}: CreateMembershipParams) => {
    return await prisma.membership.create({
        data: {
            userId,
            projectId,
            roleId,
            permission,
        }
    });
};