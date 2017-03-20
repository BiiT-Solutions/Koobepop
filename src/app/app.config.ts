import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');


export interface IAppConfig {
    koobepopServer: string;
    getTasksService:string;
    getCompaniesService: string;
    getResultsService:string;
    usmoServer:string;
    getAppointmentsService:string;
    user: string;
    password: string;
}

export const AppConfig: IAppConfig = {    
    koobepopServer: "https://testing.biit-solutions.com:8443/koobepop-server-0.0.25", 
    getCompaniesService : "/rest/getCompanies",
    getTasksService:"/rest/getCorrectiveExercisesToDo",
    usmoServer:"http://192.168.1.5:8081",
    getAppointmentsService:"/rest/getAppointments",
    getResultsService:"/rest/getAppointmentExaminations",
    user:"",
    password:"Basic d2Vic2VydmljZUB0ZXN0LmNvbTp1M2YyZVRIOTFWb0JpTmU="
};