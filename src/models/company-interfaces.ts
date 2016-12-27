
export interface Contact{
    name: string;
    mail: string;
    phone: string;
}

export interface Company {
    //remove when testing is done
    image: string;
    name: string;
    contacts: Contact[];
    brands: string[];
    products: string[];
    services: string[];
}