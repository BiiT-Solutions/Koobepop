import { FormResult } from './results';
export interface IAppointment{
    endTime:number;
    startTime:number;
    updateTime:number;
    sport:string;
    examinationType:string;
    doctorFirstName:string;
    doctorLastName:string;
    appointmentId:number;
    results:FormResult[];
}