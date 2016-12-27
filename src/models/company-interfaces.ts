
export interface Contact{
    name: string;
    mail: string;
    phone: string;
}

export interface Company {
    name: string;
    contacts: Contact[];
    brands: string[];
    products: string[];
    services: string[];
}