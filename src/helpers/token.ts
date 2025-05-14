import { ER_MESSAGES } from '@/constants/constants';
import { UserProps } from '@/types/props';
import jwt, { SignOptions } from 'jsonwebtoken';
import { isEmptyStrings } from './regex';

export function generateTokens({ userId, email }: UserProps) {
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = process.env.JWT_EXPIRATION as string;
    const refreshSecret = process.env.JWT_REFRESH_SECRET as string;
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRATION as string;

    if (isEmptyStrings([secret, expiresIn, refreshSecret, refreshExpiresIn])) {
        throw new Error(ER_MESSAGES.NOT_FOUND_JWT_KEYS);
    }

    const payload = { userId: userId, email: email };
    const options = { expiresIn } as unknown as SignOptions;
    const refreshOptions = { expiresIn: refreshExpiresIn } as unknown as SignOptions;

    const token = jwt.sign(payload, secret, options);
    const refreshToken = jwt.sign(payload, refreshSecret, refreshOptions);

    return { token, refreshToken };
};

export function validateToken(token: string, secretKey: string) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        console.error('JWT expired: ', error);
        return { payload: null, expired: true };
    }
};