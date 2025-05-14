import { ER_MESSAGES } from "@/constants/constants";
import { isEmptyStrings, isValidEmail, isValidPassword } from "@/helpers/regex";
import { badRequest } from "@/helpers/response";
import { RegisterUserProps } from "@/types/props";

export function validateRegister({ email, password, confirmPassword }: RegisterUserProps) {
    // Empty fields validation.
    if (isEmptyStrings([email, password, confirmPassword]))
        return badRequest(ER_MESSAGES.REQUIRED_FIELDS);

    // Same Password validation.
    if (password !== confirmPassword)
        return badRequest(ER_MESSAGES.NOT_SAME_PASSWORDS);

    // Email validation.
    if (!isValidEmail(email))
        return badRequest(ER_MESSAGES.INVALID_EMAIL);

    // Password validation.
    if (!isValidPassword(password))
        return badRequest(ER_MESSAGES.INVALID_PASSWORD);
}