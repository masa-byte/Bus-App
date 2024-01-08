
export interface User {
    id: number;
    email: string;
    password?: string;
    name: string;
    surname: string;
    phone: string;
    birthDate: Date;
    type: string;
}
