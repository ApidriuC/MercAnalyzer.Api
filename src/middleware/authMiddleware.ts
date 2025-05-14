import { serverError, unauthorized } from "@/helpers/response";
import { validateToken } from "@/helpers/token";

export function authMiddleware(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization') as string;
        if (!authHeader) return unauthorized();

        const containsBearer = authHeader.includes('Bearer');
        if (!containsBearer) return unauthorized();

        const token = authHeader.split(' ')[1];
        const { expired, payload } = validateToken(token, process.env.JWT_SECRET as string);
        if (expired) return unauthorized();

        req.headers.set('x-user', JSON.stringify(payload));
    }
    catch (error) {
        console.error('Error validating token: ', error);
        return serverError();
    }
};