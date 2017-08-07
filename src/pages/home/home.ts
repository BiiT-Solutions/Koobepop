import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { WorkBookPage } from '../work-book/work-book';
import { ReportPage } from '../report/report';
import { KnowPage } from '../know/know';
import { SummaryPage } from '../summary/summary';
import { TestPage } from '../test-page/test-page';
import { ServicesManager } from '../../providers/servicesManager';
import { PushNotificationsHandlerProvider } from '../../providers/push-notifications-handler/push-notifications-handler';
import { MessageModel } from '../../models/message.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab0Root = ReportPage;
  tab1Root = WorkBookPage;
  tab2Root = SummaryPage;
  tab3Root = KnowPage;
  tab4Root = TestPage;
  @ViewChild("homeTabs") homeTabs: Tabs;
  pendingMessages: number = 0;
  constructor(public navCtrl: NavController,
    public manager: ServicesManager,
    protected pushHandler: PushNotificationsHandlerProvider) {
    //Init push notifications handler
    console.log(this.pendingMessages);
    pushHandler.init();
    if (pushHandler.getPushObject() != undefined) {
      pushHandler.getPushObject().on('notification').subscribe((notification: any) => {
        console.log('Received a notification', notification)
        this.manager.updateMessages().subscribe(newMsgs=>{this.pendingMessages += newMsgs;console.log("update",this.pendingMessages); });
        if (!notification.additionalData.foreground) {
          if (this.homeTabs != undefined) {
            this.homeTabs.select(3);
          }
        }
      });
    }
    this.manager.getPendingMessages().subscribe((msgs)=> {this.pendingMessages = msgs; console.log(this.pendingMessages);});
  }

  private addMessage(message: MessageModel): Observable<MessageModel[]> {
    return this.manager.getMessages().flatMap((messages: MessageModel[]) => {
      messages.unshift(message);
      return this.manager.setMessages(messages);
    });
  }

  ionViewDidLoad() {
    this.manager.startContinuousAppointmentCheck(1000 * 60 * 30);//check every 30 minutes
  }

  ionViewWillUnload(){
    this.manager.setPendingMessages(this.pendingMessages);
  }

  navTest() {
    this.navCtrl.push(TestPage);
  }

  navAgendaView() {
    this.navCtrl.push(WorkBookPage);
  }

  navReportView() {
    this.navCtrl.push(ReportPage);
  }

  navKnow() {
    this.navCtrl.push(KnowPage);
  }

  navSummary() {
    this.navCtrl.push(SummaryPage);
  }

  removeBadge() {
    this.pendingMessages = 0;
  }
public getPendingMessages(){
  return this.pendingMessages;
}

}

