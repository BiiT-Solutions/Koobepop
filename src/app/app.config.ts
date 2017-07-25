import { OpaqueToken } from '@angular/core';
export let APP_CONFIG = new OpaqueToken('app.config');


export interface IAppConfig {
  getTasksService: string;
  getResultsService: string;
  usmoServer: string;
  getAppointmentsService: string;
  getUpdatedAppointmentsService: string;
  getAuthenticationToken: string;
  addPerformedExercise: string;
  removePerformedExercise: string;
  password: string;
  verifyAuthenticationToken: string;
  sendAuthCodeSMS: string;
  organizationName: string;
  performActions: string;
  setPushNotificationsToken: string;
  pushSenderID: string;
  getReportService: string;
}

export const AppConfig: IAppConfig = {
  //Server configuration

  usmoServer: "http://192.168.1.5:8081",    //LOCAL server
  //usmoServer: "https://testing.biit-solutions.com:10443/usmo/webservices", //TESTING server
  password: "Basic d2Vic2VydmljZUB0ZXN0LmNvbTp1M2YyZVRIOTFWb0JpTmU=", //LOCAL & TESTING

  //M3SPORT server
  //usmoServer:"https://m3sport.biit-solutions.com:10443/usmo/webservices",
  //password:"d2Vic2VydmljZUBiaWl0LXNvbHV0aW9ucy5jb206UFNJZG4zTDkzcEFpYjdr",

  organizationName:
  "Orbis Sport",
  //"UsmoOrganization",

  //Services
  getTasksService: "/rest/getCorrectiveExercisesAuth",
  getAppointmentsService: "/rest/getAppointmentsAuth",
  getResultsService: "/rest/getExaminationResultsAuth",
  addPerformedExercise: "/rest/addPerformedExerciseAuth",
  removePerformedExercise: "/rest/removePerformedExerciseAuth",
  getAuthenticationToken: "/rest/getAuthenticationToken",
  verifyAuthenticationToken: "/rest/verifyAuthenticationToken",
  sendAuthCodeSMS: "/rest/sendAuthCodeSMS",
  getUpdatedAppointmentsService: "/rest/getUpdatedAppointmentsAuth",
  performActions: "/rest/performExercisesActionsAuth",
  setPushNotificationsToken: "/rest/setPushNotificationToken",
  getReportService: "/graphics/getReportContentAuth",
  pushSenderID: '489751559671'
};
