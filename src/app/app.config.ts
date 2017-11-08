import { OpaqueToken } from '@angular/core';
export let APP_CONFIG = new OpaqueToken('app.config');


export interface IAppConfig {
  getTasksService: string;
  usmoServer: string;
  getAppointmentsService: string;
  getUpdatedAppointmentsService: string;
  getAuthenticationToken: string;
  addPerformedExercise: string;
  removePerformedExercise: string;
  password: string;
  verifyAuthenticationToken: string;
  sendCodeSMS: string;
  organizationName: string;
  performActions: string;
  setPushNotificationsToken: string;
  pushSenderID: string;
  getReportService: string;
  getMessagesService: string;
}

export const AppConfig: IAppConfig = {
  //Server configuration
  usmoServer:
     "http://192.168.1.5:8081"    //LOCAL server
  // "https://testing.biit-solutions.com:10443/usmo/webservices" //TESTING server
  // "https://m3sport.biit-solutions.com:10443/usmo/webservices" //M3SPORT server

  , password:
    "Basic d2Vic2VydmljZUB0ZXN0LmNvbTp1M2YyZVRIOTFWb0JpTmU=" //LOCAL & TESTING
  //"d2Vic2VydmljZUBiaWl0LXNvbHV0aW9ucy5jb206UFNJZG4zTDkzcEFpYjdr" //M3SPORT

  , organizationName:
   //"Orbis Sport"
  "UsmoOrganization"

  , pushSenderID: '489751559671'

  //Services
  , sendCodeSMS:                    "/rest/sendAuthCodeSMS"
  , getAuthenticationToken:         "/rest/getAuthenticationToken"
  , verifyAuthenticationToken:      "/rest/verifyAuthenticationToken"
  , getMessagesService:             "/rest/getMessagesAuth"
  , getUpdatedAppointmentsService:  "/rest/getUpdatedAppointmentsAuth"
  , getTasksService:                "/rest/getCorrectiveExercisesAuth"
  // TODO - This should be handled by the perform actions service
  , addPerformedExercise:           "/rest/addPerformedExerciseAuth"
  , removePerformedExercise:        "/rest/removePerformedExerciseAuth"

  , performActions:                 "/rest/performExercisesActionsAuth"

  , setPushNotificationsToken:      "/rest/setPushNotificationToken"
  , getReportService:               "/graphics/getReportContentAuth"

  , getAppointmentsService:         "/rest/getAppointmentsAuth"
};
