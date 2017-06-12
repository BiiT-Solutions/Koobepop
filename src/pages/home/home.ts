import { Component,  ViewChild } from '@angular/core';
import { NavController,Tabs } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { AgendaPage } from '../agenda/agenda';
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
  tab1Root = AgendaPage;
  tab2Root = SummaryPage;
  tab3Root = KnowPage;
  @ViewChild("homeTabs") homeTabs: Tabs;
  constructor(public navCtrl: NavController,
    public manager: ServicesManager,
    protected pushHandler: PushNotificationsHandlerProvider) {
    //Init push notifications handler
    pushHandler.init();
    if (pushHandler.getPushObject() != undefined) {
      pushHandler.getPushObject().on('notification').subscribe((notification: any) => {
        console.log('Received a notification', notification)
        this.addMessage(new MessageModel(notification.title,notification.message,'',notification.additionalData.time))
          .subscribe((messages) => {
            if (notification.additionalData.foreground) {
              //we are into the app
            } else {
              //we entered from a notification
              //(Select tab)
              if(this.homeTabs!=undefined){
                this.homeTabs.select(3);
              }
              //this.navCtrl.push(KnowPage);
            }
          }
          );
      }, error => { console.error("Error on notification: ", error) });
    }
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

  navAbout() {
    this.navCtrl.push(AboutPage);
  }

  navTest() {
    this.navCtrl.push(TestPage);
  }

  navAgendaView() {
    this.navCtrl.push(AgendaPage);
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

}

