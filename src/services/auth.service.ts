import prisma from '../utils/prisma.util';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.util';

export const registerUserService = async (name: string, username: string, email: string, password: string) => {
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    const existingUsername = await prisma.user.findUnique({ where: { username } });

    if (existingEmail) throw new Error('Email already in use');
    if (existingUsername) throw new Error('Username already in use');

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, username, email, password: hashed },
    });

    const token = generateToken({ userId: user.id, userRol: user.userRol, name: user.name, email: user.email });
    return { user, token };
};

export const loginUserService = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const updateLogin = await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
    });

    const token = generateToken({ userId: user.id, userRol: user.userRol, name: user.name, email: user.email });
    return { user: updateLogin, token };
}