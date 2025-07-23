import prisma from "../utils/prisma.util";

export const rateUserService = async ({
    fromUserId,
    toUserId,
    isLike,
}: {
    fromUserId: string;
    toUserId: string;
    isLike: boolean;
}) => {
    if (fromUserId === toUserId) {
        throw new Error("You can't rate yourself.");
    }

    // verifica si ya existe un voto previo
    const existing = await prisma.logRating.findUnique({
        where: {
            fromUserId_toUserId: { fromUserId, toUserId },
        },
    });

    if (existing) {
        throw new Error('You already rated this user.');
    }

    // crea el rating
    await prisma.logRating.create({
        data: { fromUserId, toUserId, isLike },
    });

    // actualiza contador
    await prisma.user.update({
        where: { id: toUserId },
        data: {
            likesReceived: isLike ? { increment: 1 } : undefined,
            dislikesReceived: !isLike ? { increment: 1 } : undefined,
        },
    });

    return { message: 'Rating submitted successfully' };
};
