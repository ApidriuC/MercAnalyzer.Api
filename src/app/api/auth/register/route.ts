import { ER_MESSAGES, SECURITY_HASH } from "@/constants/constants";
import { errorHandler } from "@/helpers/errorHandler";
import { badRequest, success } from "@/helpers/response";
import { UserRepository } from "@/lib/repositories/UserRepository";
import { RegisterUserProps } from "@/types/props";
import { validateRegister } from "@/validators/validateRegister";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const data: RegisterUserProps = await req.json();

        const validatorResponse = validateRegister(data);
        if (validatorResponse instanceof Response) return validatorResponse;
        const { email, password } = data;

        // Find user by email.
        const existsUser = await UserRepository.findByEmail(email);
        if (existsUser) return badRequest(ER_MESSAGES.EMAIL_EXISTS);

        const hashedPassword = await bcrypt.hash(password, SECURITY_HASH);

        // Create user.
        await UserRepository.create(email, hashedPassword);
        return success('Usuario registrado correctamente.');
    }
    catch (error) {
        errorHandler(req, error);
    }
};