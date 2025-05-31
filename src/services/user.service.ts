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
        },
    });
};