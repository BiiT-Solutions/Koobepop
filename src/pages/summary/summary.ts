import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { TaskModel } from '../../models/taskI';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IUser } from '../../models/userI';

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  actualWeek: number = 0;
  trackerPath: SafeResourceUrl;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public manager: ServicesManager,
    private sanitizer: DomSanitizer) {
    this.trackerPath = sanitizer.bypassSecurityTrustResourceUrl('tracker-dist/index.html');

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
    return this.manager.getTasks().map((tasks: TaskModel[]) => {
      let workouts = []
      let firstWeekDay: number = moment().week(week).startOf("isoWeek").valueOf();  //monday
      tasks.forEach(task => {
        let performations: Map<number,number>= task.performedOn.get(firstWeekDay);
        if (performations != undefined) {
          let timesPerformed = 0;
          performations.forEach((score,date) => {
            workouts.push({
              "date": date,
              "name": task.name,
              "assessment": task.type,
              "health": 0,
              "sleep": 0,
              "score": timesPerformed >= task.repetitions ? 0 : 1
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
      return this.manager.getTasks().map((tasks: TaskModel[]) => {

        let taskTypesGoals: Map<string, number> = new Map();

        tasks.forEach((task: TaskModel) => {
          if (!taskTypesGoals.has(task.type)) {
            taskTypesGoals.set(task.type, 0);
          }
          taskTypesGoals.set(task.type, taskTypesGoals.get(task.type) + task.repetitions);
        });

        let goals = [];
        taskTypesGoals.forEach((num, key) => {
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
