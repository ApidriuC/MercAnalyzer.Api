import { ER_MESSAGES } from "@/constants/constants";
import { isEmptyStrings } from "@/helpers/regex";
import { badRequest } from "@/helpers/response";
import { SearchProps } from "@/types/props";

export function validateSearch({ filter }: SearchProps) {
    // Empty fields validation.
    if (isEmptyStrings([filter]))
        return badRequest(ER_MESSAGES.REQUIRED_FIELDS);

    // Filter validation.
    if (filter.length < 3)
        return badRequest(ER_MESSAGES.MIN_FILTER_CHARS_LENGTH);
}