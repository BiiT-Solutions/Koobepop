import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video';
import { EffortSelectorComponent } from '../../components/effort-selector/effort-selector';
import { PopoverController } from 'ionic-angular';
import { ITask } from '../../models/taskI';
import { TasksRestProvider } from '../../providers/tasksProvider';
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
  ONE_WEEK_IN_MILIS: number = this.ONE_DAY_IN_MILIS * 7;
  today: number = (new Date()).setHours(0,0,0,0);
  actualDay: number = (new Date()).setHours(0,0,0,0);
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
    public taskProv: TasksRestProvider,
    public storageService: StorageService) {}

  ionViewDidLoad() {
    this.storageService.getTasks().then(tasks => {
      this.tasksPlan = tasks;
    });
    //TODO check for changes on tasks if possible (Online)
  }

  /* When item is clicked */
  //TODO Define event's Type
  checkMark(event) {
    //Init map in case it hasn't been
    if (event.task.performedOn == undefined) {
      event.task.performedOn = new Map<number, number>();
    }
    if (!event.task.performedOn.has(event.day)) {
      let popover = this.popoverCtrl
        .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: false });
      popover.onDidDismiss((score: number) => {
        event.task.performedOn.set(event.day, score);
        this.storageService.setTasks(this.tasksPlan).catch(e => console.log("Error saving the tasks"+e));
        let toast = this.toastCtrl.create({
          message: event.task.name + ' finished! difficulty: ' + score,
          duration: 2000,
          cssClass: 'good-toast'
        });
        toast.present();
      });
      popover.present({ ev: event.event });
    } else {
      event.task.performedOn.delete(event.day);
      this.storageService.setTasks(this.tasksPlan).catch(e => console.log("Error saving the tasks"+e));
    }
    //TODO Save Tasks and send to USMO ?
  }

  /* Listeners for when the slides are swiped */
  nextSlide() {
    // Make sure we moved forward
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

  public gotoExerciseVideo(videoUrl: string) {
    this.navCtrl.push(VideoPage, { videoUrl: videoUrl });
  }
  //TODO Fill with relevant data from somewhere. A provider?
  public gotoExerciseInfo(infoUrl: string) {
    window.open("https://www.sportzorg.nl/oefeningen/core-stabilityoefeningen-rompstabiliteit");
  }

  public goToToday(){
    this.days = [
    this.today - this.ONE_DAY_IN_MILIS * 2,
    this.today - this.ONE_DAY_IN_MILIS,
    this.today,
    this.today + this.ONE_DAY_IN_MILIS,
    this.today + this.ONE_DAY_IN_MILIS * 2];
    this.actualDay=this.today;
  }
}