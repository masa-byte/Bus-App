
export interface RegularUser {
    id: string;
    email: string;
    password?: string;
    name: string;
    phone: string;
    type: string;
    surname?: string;
    birthDate?: Date;
}