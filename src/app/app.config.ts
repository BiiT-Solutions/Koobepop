import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');


export interface IAppConfig {
    koobepopServer: string;
    getCompaniesService: string;
    user: string;
    password: string;
}

export const AppConfig: IAppConfig = {    
    koobepopServer: "https://testing.biit-solutions.com:8443/koobepop-server-0.0.25",    
    getCompaniesService : "/rest/getCompanies",
    user:"",
    password:""
};