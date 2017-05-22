import { ITask } from '../models/taskI';
import { Injectable } from '@angular/core';
import { TasksRestService } from './rest/tasksRestService';
//TODO - Integrate on the app
/* This class is suposed to manage the sending of performed and removed tasks to the server*/
@Injectable()
export class TasksManager{
    private taskActions:TaskAction[] = [];
    public constructor(public tasksServices:TasksRestService){
    }

    public  finishTask(task:ITask,time:number,score:number){
        let action:TaskAction = new TaskAction(task.name,time,score,TaskFlag.TASK_FINISHED,task.appointmentId)
        this.addTaskAction(action);
    }
    
    public unfinishTask(task:ITask,time:number){
        let action:TaskAction = new TaskAction(task.name,time,0,TaskFlag.TASK_UNFINISHED,task.appointmentId)
        this.removeTaskAction(action);
    }

    public sendStagedActions(){
        this.tasksServices.sendTasks(this.taskActions).subscribe((res)=>{
            if(res.status == 200){
            console.log("Success sending tasks");
            this.taskActions = [];
        }else{
            console.log("Error sending tasks")
        }
        },error=>console.log("Error sending tasks"));
    }
    
    private addTaskAction(taskAction:TaskAction){
        //Get actions with the same name and time
        let alreadyStagedActions: TaskAction[] = this.taskActions.filter((action:TaskAction)=>{
            return (action.name == taskAction.name && action.time == taskAction.time);
        });
        //Remove those from the list (tipically this willl be 1 max)
        if(alreadyStagedActions.length>0){
            alreadyStagedActions.forEach((task:TaskAction)=>{
              this.taskActions.splice(this.taskActions.indexOf(task),1);
            });
        }
        //Add the new task to the list
         this.taskActions.push(taskAction);
    }
    
    private removeTaskAction(taskAction:TaskAction){
        //Get actions with the same name and time
        let alreadyStagedActions: TaskAction[] = this.taskActions.filter((action:TaskAction)=>{
            return (action.name == taskAction.name && action.time == taskAction.time);
        });
        //Remove those from the list (tipically this willl be 1 max)
        if(alreadyStagedActions.length>0){
            alreadyStagedActions.forEach((task:TaskAction)=>{
              this.taskActions.splice(this.taskActions.indexOf(task),1);
            });
        }
        //Add the new task to the list
         this.taskActions.push(taskAction);
    }

}

export class TaskAction{
    name:string;
    time:number;
    score:number;
    action:TaskFlag;
    appointmentId:number;
    constructor(name:string,time:number,score:number,action:TaskFlag,appointmentId:number){
        this.name = name;
        this.time = time;
        this.score = score;
        this.action = action;
        this.appointmentId = appointmentId;
    }
}
export enum TaskFlag{
TASK_FINISHED,
TASK_UNFINISHED
}