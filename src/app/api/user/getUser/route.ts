import { ER_MESSAGES } from "@/constants/constants";
import { errorHandler } from "@/helpers/errorHandler";
import { badRequest, success } from "@/helpers/response";
import { getUserSession } from "@/helpers/session";
import { UserRepository } from "@/lib/repositories/UserRepository";
import { authMiddleware } from "@/middleware/authMiddleware";
import { UserProps } from "@/types/props";

export async function POST(req: Request) {
    try {
        const authResponse = authMiddleware(req);
        if (authResponse instanceof Response) return authResponse;

        const userOrResponse = getUserSession(req);
        if (userOrResponse instanceof Response) return userOrResponse;

        const { userId, email }: UserProps = userOrResponse;

        // User ID validation.
        const existsUser = UserRepository.findById(userId);
        if (!existsUser) return badRequest(ER_MESSAGES.USER_NOT_EXISTS);

        return success({ email });
    }
    catch (error) {
        errorHandler(req, error);
    }
};