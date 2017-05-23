import { OpaqueToken } from '@angular/core';
export let APP_CONFIG = new OpaqueToken('app.config');


export interface IAppConfig {
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
    performActions:string;
}

export const AppConfig: IAppConfig = {  
    //Server configuration 
    usmoServer:
    //"http://192.168.1.5:8081",    //LOCAL server
    //"https://testing.biit-solutions.com:10443/usmo/webservices", //TESTING server
    "https://m3sport.biit-solutions.com:10443/usmo/webservices",    
    
    password:
    //"Basic d2Vic2VydmljZUB0ZXN0LmNvbTp1M2YyZVRIOTFWb0JpTmU=", //LOCAL & TESTING 
    btoa("webservice@biit-solutions.com:PSIdn3L93pAib7k"),      //M3Sport
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
    getUpdatedAppointmentsService:"/rest/getUpdatedAppointmentsAuth",
    performActions:"/rest/performExercisesActionsAuth"
};