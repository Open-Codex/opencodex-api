import prisma from "./prisma.util";

export const getDefaultRole = async () => {
    const role = await prisma.role.findFirst({
        where: { name: 'Developer' },
    });

    if (!role) throw new Error('No default role found. Please seed roles.');

    return role.id;
};