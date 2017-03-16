import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video';
import { EffortSelectorComponent } from '../../components/effort-selector/effort-selector';
import { PopoverController } from 'ionic-angular';
import { ITask } from '../../models/taskI';
import { TasksProvider } from '../../providers/tasksProvider';
import { StorageService } from '../../providers/storageService';
/**
 * 
 */

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {
  ONE_DAY_IN_MILIS: number = 24 * 60 * 60 * 1000;
  ONE_WEEK_IN_MILIS: number = this.ONE_DAY_IN_MILIS*7;
  today: number = Date.now();
  actualDay: number = Date.now();
  days: number[] = [
    this.today - this.ONE_DAY_IN_MILIS * 2,
    this.today - this.ONE_DAY_IN_MILIS,
    this.today,
    this.today + this.ONE_DAY_IN_MILIS,
    this.today + this.ONE_DAY_IN_MILIS * 2];
  oldIndex = 2
  @ViewChild('slider') slider: Slides;
  tasksPlan: ITask[] = [];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public taskProv: TasksProvider,
    public storageService: StorageService) {
  }
  
  ionViewDidLoad() { 
    this.storageService.getTasks().then(tasks =>{
      this.tasksPlan=tasks;
    });

    //this.tasksPlan = this.taskProv.getTasks();   
    //this.taskProv.requestTasks({appointmentId:7}).subscribe(tasks=>{
    //  this.tasksPlan=tasks;
    //});
  }

  getTasks(day: number): ITask[] {
    // Here we get the events for the day.
    let dayTasks: ITask[] = [];

    this.tasksPlan.forEach(task => {
      console.log("Task starting date: "+new Date(task.startingTime).toDateString()+" "+(task.startingTime <= day)+" "+new Date(day).toDateString());
      if (task.startingTime <= day ) {
        dayTasks.push(task);
      }
    });
    return dayTasks;
  }

  /* Check if the task has already been performed */
  checkPerformedTask(task: ITask, day: number): boolean {

    console.log("changes were made to this")
    if(task.performedOn==undefined){
      task.performedOn=[];
      return false;
    }else{
    let boolean = task.performedOn.indexOf(day) >= 0;
    return boolean;
    }
  }

  /* When item is clicked */
  checkMark(event, task: ITask, day: number) {
    //Init list in case it hasn't been
    if(task.performedOn==undefined){
      task.performedOn=[];
    }

    if (task.performedOn.indexOf(day) < 0) {
      task.performedOn.push(day);
      task.performedOn = task.performedOn.sort();
      let popover = this.popoverCtrl
      .create(EffortSelectorComponent,{}, { cssClass: 'effort-selector-popover', enableBackdropDismiss:false });
      popover.onDidDismiss(e => {
        let toast = this.toastCtrl.create({
          message: task.name + ' finished! difficulty: '+e,
          duration: 2000,
          cssClass: 'good-toast'
        });
        toast.present();
        // Store and send the data
      });

      popover.present({ ev: event });

    } else {
      task.performedOn.splice(task.performedOn.indexOf(day));
    }
  }

  // Checks the date of the day  
  isFuture(day: number): boolean {
    return day > this.today;
  }

  getPerformedThisWeek(task: ITask, day: number) {
    let performedThisWeek = 0;
    let week = Math.trunc((day-task.startingTime)/this.ONE_WEEK_IN_MILIS);
    let actualWeekStarts = task.startingTime + week*this.ONE_DAY_IN_MILIS;
    for (let i = 0;i < task.performedOn.length;i++) {
      if(task.performedOn[i] > actualWeekStarts && task.performedOn[i] <= day ){
        performedThisWeek++;
      }
     }
    return performedThisWeek;
  }



  finish(item) {
    let toast = this.toastCtrl.create({
      message: item.name + ' finished!',
      duration: 2000,
      cssClass: 'good-toast'
    });

    toast.present();
  }

  cancel(item) {
    let toast = this.toastCtrl.create({
      message: item.name + ' cancelled!',
      duration: 2000,
      cssClass: 'bad-toast'
    });
    toast.present();
  }

  /**
   * Listeners for when the slides are swiped
   */
  nextSlide() {
    // Make sure we moved forward
    console.log("Next")
    if (this.oldIndex < this.slider.getActiveIndex()) {
      this.actualDay += this.ONE_DAY_IN_MILIS;
      if (this.days.indexOf(this.actualDay + this.ONE_DAY_IN_MILIS * 2) >= 0) {
      } else {
        this.days.push(this.actualDay + this.ONE_DAY_IN_MILIS * 2);
        this.slider.slidePrev(0);
        this.days.shift();
      }
      this.oldIndex = this.slider.getActiveIndex();
    }
  }
  prevSlide() {
    // Make sure we moved backwards
    console.log("Prev")
    if (this.oldIndex > this.slider.getActiveIndex()) {
      this.actualDay -= this.ONE_DAY_IN_MILIS;
      if (this.days.indexOf(this.actualDay - this.ONE_DAY_IN_MILIS * 2) >= 0) {
      } else {
        this.days.unshift(this.actualDay - this.ONE_DAY_IN_MILIS * 2);
        this.slider.slideNext(0);
        this.days.pop();
      }
    }
    this.oldIndex = this.slider.getActiveIndex();
  }


  // If the task is already done the recommended number of times in the past
  // Show it on a different color  
  pushItToTheLimit(task: ITask, day: number) {
    return (task.performedOn.length >= task.repetitions && task.performedOn.sort()[task.repetitions - 1] < day)
  }

  public gotoExerciseVideo(videoUrl: string) {
    this.navCtrl.push(VideoPage, { videoUrl: videoUrl });
  }
  //TODO Fill with relevant data from somewhere. A provider?
  public gotoExerciseInfo() {
    window.open("https://www.sportzorg.nl/oefeningen/core-stabilityoefeningen-rompstabiliteit");
  }
}