
export interface Contact{
    name: string;
    mail: string;
    phone: string;
}

export interface Company {
    name: string;
    brands: string[];
    contacts: Contact[];
    products: string[];
    services: string[];
    description: string;
}