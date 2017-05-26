import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { TaskModel } from '../../models/taskI';
import { VideoPage } from '../video/video';
import { IPerformance } from '../../models/performation';
/**
 *  This is a test page and should be removed before releasing .
 * Here you can meddle with dark magic better left alone.
 * Beware of dragons!
 * 
 */
@Component({
  selector: 'test-page',
  templateUrl: 'test-page.html'
})
export class TestPage {
  hideHeader;
  results: Map<number, any[]>;
  tasksPlan: TaskModel[] = [];
  day = Date.now();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public manager: ServicesManager) {

  }

  ionViewDidLoad() {
    this.hideHeader = false;
    //this.results = this.manager.getResults();
  }

  restart() {
  }
  public open(itemSlide: ItemSliding) {
    console.log(itemSlide.getOpenAmount());
  }
  public update(item: any) {
    //this.manager.updateAppointments();
  }
  public close(itemSlide: ItemSliding) {
    itemSlide.close();
  }
  public navTaskInfo() {
    let content = '<p><strong>Starting Position:</strong> Begin by placing hands on incline (box, wall, table, etc.) height is dependent upon ability to perform push-up property. The lower the incline, the more difficult to perform exercise. You should progress by lowering the incline until your are perfoming the push-up on the floor.</p>'
      + '<p><strong>Execution at a glance:</strong> Perform a push-up from this position, flexing elbows and extending shoulders. Press upward to start position and repeat. Perform 10-15 repetitions for 3-5 sets.</p>'
      + '<p><strong>Safety Tips and Verbal Cueing:</strong> Mantain a flat or neutral lumbar spine position. Varying foot position may increase or decrease dificluty. Take special note of right and left asymmetries, focusing on the weakness.</p>'
      + '<p>&nbsp;</p>'
      + '<p><img alt="Trunk Stability Push-Up Corrective Exercise (Dinamic Image)" src="https://liferay.biit-solutions.com:9443/documents/26348/0/Trunk+Stability+Push-Up+Corrective+Exercise+Progression+%28Animated%29/2e987a8e-1121-4c9d-8743-9455d94f3348?t=1468481372232" style="width: 985px; height: 697px;" /></p>'

    let videoUrl = "https://www.youtube.com/embed/FyDNr1sfj3w"
    //let task:TaskModel = {name:"Test task 1",startingTime:0,repetitions:1,performedOn:new Map<number,IPerformance[]>(),videoUrl:videoUrl,content:content,type:"bananas?",appointmentId:1};
    //this.navCtrl.push(VideoPage,task)
  }
}
export interface IEvent {
  name: string;
  videoUrl?: string;
}
