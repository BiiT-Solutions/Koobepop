export class MessageModel{
    text:string;
    name:string;
    title:string;
    time;
    constructor(name:string,text:string,title:string,time){
        this.name=name;
        this.text=text;
        this.title=title;
        this.time=time;
    }
    
}