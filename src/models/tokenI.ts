export interface IToken{
    head:string;
    payload:IPayload;
    signature:string;
}

export interface IPayload{
    exp:number;
}

export class TokenModel{
    head:string;
    payload:IPayload;
    signature:string;
    constructor(){}
}