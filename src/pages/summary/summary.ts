import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { ITask } from '../../models/taskI';
import { IAppointment } from '../../models/appointmentI';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  firstWeek = 0;
  actualWeek = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public manager: ServicesManager) {
    this.setFirstWeek();
    this.setActualWeek();
    window.addEventListener("tracker-ready", () => {
      //console.log("TrackerReady")
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
      console.log(this.firstWeek);
      this.firstWeek = moment(appointment.startTime).week();
      console.log(this.firstWeek);
    })
  }
  public setActualWeek() {
    console.log(this.actualWeek);
    this.actualWeek = moment().week();
    console.log(this.actualWeek);
  }

  ionViewDidLeave() {
    window.removeEventListener("tracker-ready");
    window.removeEventListener("prev-week");
    window.removeEventListener("next-week");
  }
  ionViewDidLoad() {
    //console.log("Detais From week: "+week);

  }

  detailsFromWeek(week: number): Observable<any> {
    return this.manager.getTasks().map((tasks: ITask[]) => {
      let workouts = []

      let firstWeekDay: number = moment().week(week).startOf("week").valueOf();  //monday
      let lastWeekDay: number = moment().week(week).endOf("week").valueOf();   //sunday
      // console.log(firstWeekDay+" #### "+lastWeekDay);
      tasks.forEach(task => {
        let iterable: IterableIterator<number> = task.performedOn.keys();
        let result = iterable.next();
        while (!result.done) {
          if (result.value > firstWeekDay && result.value < lastWeekDay) {//If the date is enclosed into the week
            //console.log(task.name);
            workouts.push({
              "date": result.value,
              "name": task.name,
              "assessment": "body health",//TODO - AppointmentType
              "health": 0,
              "sleep": 0,
              "score": 1
            });
          }
          result = iterable.next();
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
    return this.manager.getTasks().map((tasks: ITask[]) => {
      //TODO-For each task of each appointment kind add the goal for the week
      let bodyHealthGoal = 0;
      tasks.forEach((task: ITask) => {
        bodyHealthGoal += task.repetitions;
      });
      let user = {
        "name": "Henny van Doorn",
        "avatarUrl": "",
        "goals": [{
          "assessment": "body health",
          "type": "score",
          "goal": bodyHealthGoal
        }, {
          "assessment": "mental health",
          "type": "score",
          "goal": 0
        }, {
          "assessment": "food style",
          "type": "score",
          "goal": 0
        }]
      }
      return user
    });

  }

}
