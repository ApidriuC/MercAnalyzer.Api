const defaultHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

export function unauthorized(message: string = 'Unauthorized') {
    return new Response(JSON.stringify({ message }), {
        status: 401,
        statusText: message,
        headers: defaultHeaders,
    });
};

export function forbidden(message: string = 'Forbidden') {
    return new Response(JSON.stringify({ message }), {
        status: 403,
        statusText: message,
        headers: defaultHeaders,
    });
};

export function badRequest(message: string = 'Bad Request') {
    return new Response(JSON.stringify({ message }), {
        status: 400,
        statusText: message,
        headers: defaultHeaders,
    });
};

export function success(data: unknown, status: number = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: defaultHeaders,
    });
};

export function serverError(message: string = 'Internal Server Error') {
    return new Response(JSON.stringify({ message }), {
        status: 500,
        statusText: message,
        headers: defaultHeaders,
    });
};