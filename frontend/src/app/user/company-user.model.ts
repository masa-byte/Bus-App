
export interface CompanyUser {
    id: string;
    email: string;
    password?: string;
    name: string;
    phone: string;
    type: string;
    yearEstablished?: number;
    regularPriceFactor?: number;
    returnPriceFactor?: number;
    discount?: number;
    rating?: number;
}