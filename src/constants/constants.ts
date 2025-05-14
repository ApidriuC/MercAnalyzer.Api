export const ER_MESSAGES = {
    REQUIRED_FIELDS: 'Todos los campos son obligatorios.',
    MIN_FILTER_CHARS_LENGTH: 'El filtro de búsqueda debe tener al menos 3 caracteres.',
    INVALID_EMAIL: "Por favor, ingresa un correo electrónico válido. Asegúrase de que contenga un '@' y un dominio válido.",
    INVALID_PASSWORD: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    INVALID_CREDENTIALS: 'Correo o contraseña incorrectos.',
    NOT_SAME_PASSWORDS: 'Las contraseñas no coinciden.',
    EMAIL_EXISTS: 'El correo ya está registrado.',
    USER_NOT_EXISTS: 'El usuario no existe.',
    SCRAPER_ERROR: 'Ha ocurrido un error al intentar realizar la búsqueda.',
    NOT_FOUND_JWT_KEYS: 'JWT_SECRET, JWT_REFRESH_SECRET JWT_EXPIRATION y JWT_REFRESH_EXPIRATION deben estar definidos en el .env'
};

export const SECURITY_HASH = 10;