import prisma from "../utils/prisma.util"; 

export const getCategoriesService = async () => {
    return await prisma.category.findMany();
};

export const createCategoryService = async (name: string, description: string) => {
    return await prisma.category.create({ 
        data: { 
            name,
            description, 
        } 
    });
};

export const updateCategoryService = async (id: string, name: string, description: string) => {
    return await prisma.category.update({
        where: { id },
        data: { 
            name, 
            description 
        },
    });
};

/* 
export const deleteCategoryService = (id: string) => {
    return prisma.category.delete({ where: { id } });
};
*/
