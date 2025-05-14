import validator from 'validator';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d).{8,}$/;

export function isValidEmail(email: string): boolean {
    return validator.isEmail(email);
}

export function isValidPassword(password: string): boolean {
    return passwordRegex.test(password);
}

export function isEmptyStrings(strings: string[]): boolean {
    return strings.some(str => !str || str.trim() === '');
};