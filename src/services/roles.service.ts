import prisma from '../utils/prisma.util';

export const createRoleService = async (name: string) => {
    return await prisma.role.create({
        data: { name }
    });
};

export const getRoleService = async () => {
    return await prisma.role.findMany();
};

export const updateRoleService = async (id: string, name: string) => {
    return await prisma.role.update({
        where: { id },
        data: { name }
    });
};