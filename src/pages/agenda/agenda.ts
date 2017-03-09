import { Component, ViewChild, Input } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video';
/**
 * 
 */
export interface ITask {
  name: string;
  startDate: number;
  dueDate: number;
  performTimes:number
  performedOn:number[]; //

  videoUrl?: string;
  infoUrl?: string;
}

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {
  item1;
  item2;
  item3;  
  today:number = Date.now();
  day:number = Date.now();
  DAY_IN_MILIS: number = 24 * 60 * 60 * 1000;
  @ViewChild('slider') slider: Slides;
  finishedTasks = [];
  tasksPlan: ITask[] = [];
  task: ITask = {
    name: 'Bridge with exercise ball',
    videoUrl: "https://www.youtube.com/embed/sesXc7GIU1A",
    startDate: Date.now(),
    dueDate: Date.now(),
    performTimes: 2,
    performedOn: []
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
        
  }
  ionViewDidLoad() { 
    this.tasksPlan = [
      {
        name: 'Bridge with exercise ball',
        videoUrl: "https://www.youtube.com/embed/sesXc7GIU1A",
        startDate: this.today,
        dueDate: this.today + this.DAY_IN_MILIS * 5,
        performTimes: 4,
        performedOn: []
      },
      {
        name: 'Crunches',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: this.today - this.DAY_IN_MILIS * 2,
        dueDate: this.today + this.DAY_IN_MILIS * 4,
        performTimes:2,
        performedOn:[]
      }

    ];
  }

  getTasks(day: number): ITask[] {
    //Here we get the events for the day.
    let dayTasks: ITask[] = [];
    this.tasksPlan.forEach(task => {
      if (task.startDate <= day && task.dueDate >= day) {
        dayTasks.push(task);
      }
    });
    //We have to check if the task has already been performed for today.
    //There would be a color change if the task is in the program
    return dayTasks;
  }

  // Check if the task is already performed
  checkPerformedTask(task:ITask,day:number): boolean {
    let boolean = task.performedOn.indexOf(day) >= 0;
    console.log(task.name+" -> "+boolean);
    return boolean;
  }
  // when item is clicked 
  checkMark(task:ITask,day:number) {
    console.log(task)

    if (task.performedOn.indexOf(day)<0) {
      task.performedOn.push(day);
      console.log(task.name+" performed in "+new Date(day));
      console.log(task.performedOn)
      console.log(this.tasksPlan[1])
    } else {
      console.log(task.name+" <- UNperformed in -> "+new Date(day));
      task.performedOn.splice(task.performedOn.indexOf(day));  
     }
  }
  // Checks the date of the day  
  isFuture(day: number): boolean {
    return day > this.today;
  }


  finish(item) {
    //this.removeItem(item)
    let toast = this.toastCtrl.create({
      message: item.name + ' finished!',
      duration: 3000,
      cssClass: 'good-toast'
    });

    toast.present();
  }
  cancel(item) {
    let toast = this.toastCtrl.create({
      message: item.name + ' cancelled!',
      duration: 3000,
      cssClass: 'bad-toast'
    });
    toast.present();
  }
  public nextArrow() {
    this.slider.slideNext();
  }
  public prevArrow() {
    this.slider.slidePrev();
  }

  /**
   * ionSlide methods are triggered by slideNext() and slidePrev()
   */
  nextSlide() {
    let oldIndex = 1;
    // Make sure we moved forward
    if (oldIndex < this.slider.getActiveIndex()) {
      this.day += this.DAY_IN_MILIS;
      this.slider.slideTo(1, 0, true);
    }
    console.log(new Date(this.day));
  }

  prevSlide() {
    let oldIndex = 1;
    //TODO loop slides
    if (oldIndex > this.slider.getActiveIndex()) {
      this.day -= this.DAY_IN_MILIS;
      this.slider.slideTo(1, 0, true);
    }
    console.log(new Date(this.day));
  }

  //TODO Fill with relevant data from somewhere a provider?
  public gotoExerciseInfo() {
    window.open("https://www.sportzorg.nl/oefeningen/core-stabilityoefeningen-rompstabiliteit");
  }

  public gotoExerciseVideo(videoUrl: string) {
    this.navCtrl.push(VideoPage, { videoUrl: videoUrl });
  }

  pushItToTheLimit(task: ITask): string {
    if (task.performedOn.length>0) { return "dark" }
    else { return "light" }
  }
}


//TODO separate AgendaSlider from the day

