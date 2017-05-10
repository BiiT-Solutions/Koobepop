import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { ITask } from '../../models/taskI';
import { IAppointment } from '../../models/appointmentI';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IUser } from '../../models/userI';
import { IPerformance } from '../../models/performation';

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  firstWeek: number = 0;
  actualWeek: number = 0;
  trackerPath: SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public manager: ServicesManager, private sanitizer: DomSanitizer) {
    this.trackerPath = sanitizer.bypassSecurityTrustResourceUrl('tracker-dist/index.html');
    this.setFirstWeek();
    this.setActualWeek();
    window.addEventListener("tracker-ready", () => {
      this.detailsFromWeek(this.actualWeek).subscribe(details => {
        let event = new CustomEvent("tracker-week", { detail: details });
        window.dispatchEvent(event);
      });
      this.detailsFromUser().subscribe(userDetails => {
        let userEvent = new CustomEvent("tracker-user", { detail: userDetails });
        window.dispatchEvent(userEvent);
      });

    });

    window.addEventListener("prev-week", () => {
      this.actualWeek--;
      this.detailsFromWeek(this.actualWeek).subscribe(details => {
        let event = new CustomEvent("tracker-week", { detail: details });
        window.dispatchEvent(event);
      });
    });

    window.addEventListener("next-week", () => {
      this.actualWeek++;
      this.detailsFromWeek(this.actualWeek).subscribe(details => {
        let event = new CustomEvent("tracker-week", { detail: details });
        window.dispatchEvent(event);
      });
    });
  }

  public setFirstWeek() {
    this.manager.getActualAppointment().subscribe((appointment: IAppointment) => {
      this.firstWeek = moment(appointment.startTime).week();
    })
  }

  public setActualWeek() {
    this.actualWeek = moment().week();

  }

  ionViewDidLeave() {
    window.removeEventListener("tracker-ready");
    window.removeEventListener("prev-week");
    window.removeEventListener("next-week");
  }
  ionViewDidLoad() {

  }

  detailsFromWeek(week: number): Observable<any> {
    return this.manager.getTasks().map((tasks: ITask[]) => {
      let workouts = []
      let firstWeekDay: number = moment().week(week).startOf("isoWeek").valueOf();  //monday
      let lastWeekDay: number = moment().week(week).endOf("isoWeek").valueOf();   //sunday
      tasks.forEach(task => {
        let performations: IPerformance[] = task.performedOn.get(firstWeekDay);
        if (performations != undefined) {
        performations = performations.concat().sort((p1:IPerformance,p2:IPerformance)=>(p1.date-p2.date));
          let timesPerformed = 0;
          performations.forEach((performance) => {
              workouts.push({
              "date": performance.date,
              "name": task.name,
              "assessment": task.type,
              "health": 0,
              "sleep": 0,
              "score": timesPerformed >= task.repetitions ? 0 : 1//TODO - If an exercise is already performed it's maximum times, it should score 0.
            });
            timesPerformed++;
          });
        }
      });
      return {
        "year": "2017",
        "weekNumber": week,
        "workouts": workouts
             }
    });
  }

  detailsFromUser(): Observable<any> {
    return this.manager.getUser().flatMap((storedUser: IUser) => {
      return this.manager.getTasks().map((tasks: ITask[]) => {
   
        let taskTypesGoals:Map<string,number> = new Map();

        tasks.forEach((task: ITask) => {
          if(!taskTypesGoals.has(task.type)){
            taskTypesGoals.set(task.type,0);
          }
          taskTypesGoals.set(task.type,taskTypesGoals.get(task.type)+task.repetitions);
        });

        let goals = [];
        taskTypesGoals.forEach((num,key)=>{
          goals.push({
            "assessment": key,
            "type": "score",
            "goal": num
          })
        });
        let trackerUser = {
          "name": storedUser.name,
          "avatarUrl": "",
          "goals": goals
        };
        return trackerUser;
      });
    });
  }
}
