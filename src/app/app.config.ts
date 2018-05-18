import { OpaqueToken } from '@angular/core';
export let APP_CONFIG = new OpaqueToken('app.config');


export interface IAppConfig {
  getTasksService: string;
  getAppointmentsService: string;
  getUpdatedAppointmentsService: string;
  getAuthenticationToken: string;
  addPerformedExercise: string;
  removePerformedExercise: string;
  verifyAuthenticationToken: string;
  sendCodeSMS: string;
  performActions: string;
  setPushNotificationsToken: string;
  getReportService: string;
  getMessagesService: string;
  getUserGuard: string;

  keyData: string;
}

export const AppConfig: IAppConfig = {

  //QR Encryption key
   keyData: "1886578AB249A216C9A9A81FD69CEB0BFDFA6712396C20097537B4B77D7C74BF"

  //Services
  , sendCodeSMS: "/rest/sendAuthCodeSMS"
  , getAuthenticationToken: "/rest/getAuthenticationToken"
  , verifyAuthenticationToken: "/rest/verifyAuthenticationToken"
  , setPushNotificationsToken: "/rest/setPushNotificationToken"
  , getMessagesService: "/rest/getMessagesAuth"
  , getUpdatedAppointmentsService: "/rest/getUpdatedAppointmentsAuth"
  //, getTasksService: "/rest/getCorrectiveExercisesAuth"
  , getTasksService: "/rest/getTasksAuth"
  , getReportService: "/graphics/getReportContentAuth"

  // TODO - This should be handled by the perform actions service
  , addPerformedExercise: "/rest/addPerformedExerciseAuth"
  , removePerformedExercise: "/rest/removePerformedExerciseAuth"
  , performActions: "/rest/performExercisesActionsAuth"
  
  , getAppointmentsService: "/rest/getAppointmentsAuth"
  , getUserGuard:"/rest/getGuardCodeAuth"
};
