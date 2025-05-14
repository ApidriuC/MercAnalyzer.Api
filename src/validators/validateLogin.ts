import { ER_MESSAGES } from "@/constants/constants";
import { isEmptyStrings, isValidEmail } from "@/helpers/regex";
import { badRequest } from "@/helpers/response";
import { LoginUserProps } from "@/types/props";

export function validateLogin({ email, password }: LoginUserProps) {
    // Empty fields validation.
    if (isEmptyStrings([email, password])) return badRequest(ER_MESSAGES.REQUIRED_FIELDS);

    // Email validation.
    if (!isValidEmail(email)) return badRequest(ER_MESSAGES.INVALID_EMAIL);
}