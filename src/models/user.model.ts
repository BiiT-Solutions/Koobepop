export interface IUser{
    name?: string;
    surname?: string;
    patientId: string;
}
export class UserModel implements IUser{
    name?:string;
    surname?:string;
    patientId:string;
    constructor(){}
}