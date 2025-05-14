import { ErrorRepository } from "@/lib/repositories/ErrorRepository";
import { serverError } from "./response";

export const errorHandler = (req: Request, error: unknown): Response => {
    const errorMessage = 'Error endpoint: ' + error;
    console.error(errorMessage);
    ErrorRepository.save(errorMessage, req.url);
    return serverError();
}