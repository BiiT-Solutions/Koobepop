import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { PushNotificationsHandlerProvider } from '../../providers/push-notifications-handler/push-notifications-handler';
import { AppointmentsProvider } from '../../providers/storage/appointments-provider/appointments-provider';
import { MessagesProvider } from '../../providers/storage/messages-provider/messages-provider';
import { KnowPage } from '../know/know';
import { ReportPage } from '../report/report';
import { SettingsPage } from '../settings/settings';
import { SummaryPage } from '../summary/summary';
import { TestPage } from '../test-page/test-page';
import { WorkBookPage } from '../work-book/work-book';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab0Root = ReportPage;
  tab1Root = WorkBookPage;
  tab2Root = SummaryPage;
  tab3Root = KnowPage;
  tab4Root = SettingsPage;
  tab5Root = TestPage;

  public pendingMessages: number;

  @ViewChild("homeTabs") homeTabs: Tabs;
  constructor(public navCtrl: NavController,
    protected pushHandler: PushNotificationsHandlerProvider,
    private messagesProvider: MessagesProvider,
    private appointmentsProvider: AppointmentsProvider,
    public changeDetRef: ChangeDetectorRef) {
    //Init push notifications handler
    pushHandler.init();

    if (pushHandler.getPushObject() != undefined) {
      pushHandler.getPushObject().on('notification')
        .subscribe((notification: any) => {
          console.info('Received a notification', notification);
          messagesProvider.update();
          if (!notification.additionalData.foreground) {
            if (this.homeTabs != undefined) {
              this.homeTabs.select(3);
            }
          }
        });
      }

      this.messagesProvider.getObservableMessagesCount()
        .subscribe(msgsCnt => {
          console.log("Modified message counter", msgsCnt)
          this.pendingMessages = msgsCnt
          if(msgsCnt>0){
            this.changeDetRef.detectChanges()
          }
        });
  }

  ionViewDidLoad() {
    this.appointmentsProvider.update()
      .subscribe(appointments => {
        console.debug("Updated Appointemnts", appointments);
      })
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

}
