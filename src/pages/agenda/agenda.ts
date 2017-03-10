import { Component, ViewChild, Input } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video';
import { EffortSelectorComponent } from '../../components/effort-selector/effort-selector';
import { PopoverController } from 'ionic-angular';
/**
 * 
 */
export interface ITask {
  name: string;
  startDate: number;
  dueDate: number;
  performTimes: number
  performedOn: number[]; // sorted array of performation dates
  videoUrl?: string;
  infoUrl?: string;
}

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {

  ONE_DAY_IN_MILIS: number = 24 * 60 * 60 * 1000;
  item1;
  item2;
  item3;
  today: number = Date.now();
  day:number = Date.now();
  days: number[] = [
    this.today-this.ONE_DAY_IN_MILIS*2,
    this.today-this.ONE_DAY_IN_MILIS,
    this.today,
    this.today+this.ONE_DAY_IN_MILIS,
    this.today+this.ONE_DAY_IN_MILIS*2];
  oldIndex = 2
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,public popoverCtrl: PopoverController) {

  }
  ionViewDidLoad() {
    //TODO load taskPlan from a webservice
    this.tasksPlan = [
      {
        name: 'Bridge with exercise ball',
        videoUrl: "https://www.youtube.com/embed/sesXc7GIU1A",
        startDate: this.today,
        dueDate: this.today + this.ONE_DAY_IN_MILIS * 5,
        performTimes: 4,
        performedOn: []
      },
      {
        name: 'Crunches',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: this.today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: this.today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '3',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: this.today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: this.today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      },
      {
        name: '4',
        videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw",
        startDate: this.today - this.ONE_DAY_IN_MILIS * 2,
        dueDate: this.today + this.ONE_DAY_IN_MILIS * 4,
        performTimes: 2,
        performedOn: []
      }

    ];
  }

  getTasks(day: number): ITask[] {
    //console.log("Get tasks of the day: "+new Date(day).toLocaleDateString())
    // Here we get the events for the day.
    let dayTasks: ITask[] = [];
    this.tasksPlan.forEach(task => {
      // We have to check if the task has already been performed for this day.
      if (task.startDate <= day && task.dueDate >= day) {
        dayTasks.push(task);
      }
    });
    // There should be a color change if the task is in the program
    return dayTasks;
  }

  /* Check if the task has already been performed */
  checkPerformedTask(task: ITask, day: number): boolean {
    let boolean = task.performedOn.indexOf(day) >= 0;    
    return boolean;
  }

  /* When item is clicked */
  checkMark(task: ITask, day: number) {
    if (task.performedOn.indexOf(day) < 0) {
      task.performedOn.push(day);
      task.performedOn = task.performedOn.sort();
      let popover = this.popoverCtrl.create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover' }); 
      
      popover.onDidDismiss(e=>{
         let toast = this.toastCtrl.create({
      message: e + ' finished!',
      duration: 3000,
      cssClass: 'good-toast'
    });
    toast.present();
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


  getPerformedUntilToday(task:ITask,day:number){
    let i=0;
    for(i;task.performedOn[i]<=day&&i<task.performedOn.length;i++){}
    return i;
  }
  finish(item) {
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
  

  /**
   * Listeners for when the slides are swiped
   */
  nextSlide() {
    // Make sure we moved forward
    if (this.oldIndex < this.slider.getActiveIndex()) {
      this.day += this.ONE_DAY_IN_MILIS;
      if(this.days.indexOf(this.day+this.ONE_DAY_IN_MILIS*2)>=0){
      }else{
        this.days.push(this.day+this.ONE_DAY_IN_MILIS*2);
        this.slider.slidePrev(0);
        this.days.shift();
        
    }
     this.oldIndex = this.slider.getActiveIndex();
      //this.slider.slideTo(1, 0, true);
    }
  }
  prevSlide() {   
    // Make sure we moved backwards
    if (this.oldIndex > this.slider.getActiveIndex()) {
      this.day -= this.ONE_DAY_IN_MILIS;
      if(this.days.indexOf(this.day - this.ONE_DAY_IN_MILIS*2)>=0){
      }else{
        this.days.unshift(this.day-this.ONE_DAY_IN_MILIS*2);
        this.slider.slideNext(0);
        this.days.pop();
      }
     //this.slider.slideTo(1, 0, true);
    }
     this.oldIndex = this.slider.getActiveIndex();
  }

  public gotoExerciseVideo(videoUrl: string) {
    this.navCtrl.push(VideoPage, { videoUrl: videoUrl });
  }


  // If the task is already done the recommended number of times in the past
    // Show it on a different color  
  pushItToTheLimit(task: ITask, day:number) {   
    //console.log(task.performedOn)
    //console.log(day) 
   return (task.performedOn.length >= task.performTimes && task.performedOn.sort()[task.performTimes-1] < day )
  }

  //TODO Fill with relevant data from somewhere. A provider?
  public gotoExerciseInfo() {
    window.open("https://www.sportzorg.nl/oefeningen/core-stabilityoefeningen-rompstabiliteit");
  }

  public nextArrow() {
    this.slider.slideNext();
  }
  public prevArrow() {
    this.slider.slidePrev();
  }
}
//TODO separate AgendaSlider from the day