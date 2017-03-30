export interface IToken{
    head:string;
    payload:IPayload;
    signature:string;
}
export interface IPayload{
    exp:number;
}