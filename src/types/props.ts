export interface UserProps {
    userId: string;
    email: string;
    password: string;
}

export type LoginUserProps = Pick<UserProps, 'email' | 'password'>;

export interface RegisterUserProps extends Pick<UserProps, 'email' | 'password'> {
    confirmPassword: string
}

export interface SearchProps {
    filter: string;
}

export interface ScraperServiceResponse {
    nombre: string,
    precio: string,
    imagen: string,
    descripcion: string,
    link: string
};
