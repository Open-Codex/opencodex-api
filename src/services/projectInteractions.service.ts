import prisma from "../utils/prisma.util";

type InteractionType = "like" | "favorite";

interface ProjectInteractionParams {
    userId: string;
    projectId: string;
    type: InteractionType;
}

export const projectInteractionService = async ({
    userId,
    projectId,
    type,
}: ProjectInteractionParams) => {
    if (!userId || !projectId) {
        throw new Error("Missing userId or projectId");
    }

    if (type === "like") {
        const existing = await prisma.projectLike.findUnique({
            where: { userId_projectId: { userId, projectId } },
        });

        if (existing) {
            await prisma.$transaction([
                prisma.projectLike.delete({
                    where: { userId_projectId: { userId, projectId } },
                }),
                prisma.project.update({
                    where: { id: projectId },
                    data: { likesCount: { decrement: 1 } },
                }),
            ]);

            return { message: "Like removed", status: "removed" };
        } else {
            await prisma.$transaction([
                prisma.projectLike.create({
                    data: { userId, projectId },
                }),
                prisma.project.update({
                    where: { id: projectId },
                    data: { likesCount: { increment: 1 } },
                }),
            ]);

            return { message: "Like added", status: "added" };
        }
    }

    if (type === "favorite") {
        const existing = await prisma.projectFavorite.findUnique({
            where: { userId_projectId: { userId, projectId } },
        });

        if (existing) {
            await prisma.$transaction([
                prisma.projectFavorite.delete({
                    where: { userId_projectId: { userId, projectId } },
                }),
                prisma.project.update({
                    where: { id: projectId },
                    data: { favoritesCount: { decrement: 1 } },
                }),
            ]);

            return { message: "Favorite removed", status: "removed" };
        } else {
            await prisma.$transaction([
                prisma.projectFavorite.create({
                    data: { userId, projectId },
                }),
                prisma.project.update({
                    where: { id: projectId },
                    data: { favoritesCount: { increment: 1 } },
                }),
            ]);

            return { message: "Favorite added", status: "added" };
        }
    }

    throw new Error("Invalid interaction type");
};