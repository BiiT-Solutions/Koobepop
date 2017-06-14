
export interface IAppointment{
    endTime:number;
    startTime:number;
    updateTime:number;
    sport:string;
    examinationType:string;
    doctorFirstName:string;
    doctorLastName:string;
    appointmentId:number;
    results:any[];
    type?:string;
}
/**Represents an appointment from USMO */
export class AppointmentModel implements IAppointment{
    endTime:number;
    startTime:number;
    updateTime:number;
    sport:string;
    examinationType:string;
    doctorFirstName:string;
    doctorLastName:string;
    appointmentId:number;
    results:any[];
    type?:string;
    
    constructor(){}
    
}