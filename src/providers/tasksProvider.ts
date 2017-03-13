import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { ITask } from '../models/taskI'
@Injectable()
export class TasksProvider {
    ONE_DAY_IN_MILIS = 24*60*60*1000
  taskList:ITask[];
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
      let today = Date.now();
   this.taskList = [
      {
        name: 'Bridge with exercise ball',
        videoUrl: "https://www.youtube.com/embed/sesXc7GIU1A",
        startDate: today,
        dueDate: today + this.ONE_DAY_IN_MILIS * 5,
        performTimes: 4,
        performedOn: []
      },
      {
        name: 'Crunches',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '3',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '4',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '5',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '6',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '7',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '8',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '9',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '10',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '11',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      }

    ];
  }
  
  //TODO retrieve from web service
  getTasks() {
    return this.taskList;
  }

  requestTasks(criteria,callback?) {
    let requestAddres = this.config.usmoServer + this.config.getTasksService;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);

    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((tasks)=>{
        let response:ITask[] = [];
        if(tasks){
        tasks.forEach((task:ITask) =>{
          response = response.concat(task);//TODO transform to a desired object TYPES!
        })
      }
        return response;
      });
    }

  extractData(res: Response) {
    return res.json() || {};
  }
}