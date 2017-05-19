import { OpaqueToken } from '@angular/core';
export let APP_CONFIG = new OpaqueToken('app.config');


export interface IAppConfig {
    koobepopServer: string;
    getTasksService:string;
    getResultsService:string;
    usmoServer:string;
    getAppointmentsService:string;
    getUpdatedAppointmentsService:string;
    getAuthenticationToken:string;
    addPerformedExercise:string;
    removePerformedExercise:string;
    password: string;
    verifyAuthenticationToken:string;
    sendAuthCodeSMS:string;
    organizationName:string;
}

export const AppConfig: IAppConfig = {  
    //Server configuration  
    koobepopServer: "https://testing.biit-solutions.com:8443/koobepop-server-0.0.25", 
    usmoServer:
    "https://testing.biit-solutions.com:9443/usmo/webservices",   //usmo-1.3.98",
    //"http://192.168.1.5:8081",
    password:"Basic d2Vic2VydmljZUB0ZXN0LmNvbTp1M2YyZVRIOTFWb0JpTmU=",//Despedazar (?)
    organizationName:
    //"UsmoOrganization",
    "Orbis Sport",
    //Services
    getTasksService:"/rest/getCorrectiveExercisesAuth",
    getAppointmentsService:"/rest/getAppointmentsAuth",
    getResultsService:"/rest/getExaminationResultsAuth",
    addPerformedExercise:"/rest/addPerformedExerciseAuth",
    removePerformedExercise:"/rest/removePerformedExerciseAuth",   
    getAuthenticationToken:"/rest/getAuthenticationToken",
    verifyAuthenticationToken:"/rest/verifyAuthenticationToken",
    sendAuthCodeSMS:"/rest/sendAuthCodeSMS",
    getUpdatedAppointmentsService:"/rest/getUpdatedAppointmentsAuth"
};