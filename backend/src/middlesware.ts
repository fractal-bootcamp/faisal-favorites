import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { prismaClient } from "../prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req)
    if (!userId) {
        res.status(500).json({ error: "User not logged in" })
        return;
    }

    const clerkUser = await clerkClient.users.getUser(userId)

    let user = await prisma.user.findFirst({
        where: { clerkUserId: userId }
    })

    if (!user) {
        user = await prisma.user.upsert({
            where: { clerkUserId: userId },
            update: {},
            create: {
                clerkUserId: userId,
                email: clerkUser?.primaryEmailAddress?.emailAddress,
                firstName: clerkUser?.firstName,
                lastName: clerkUser?.lastName,
            },
        })
    }

    req.user = user
    next();
}