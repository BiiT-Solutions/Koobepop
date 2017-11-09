import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { WorkBookPage } from '../work-book/work-book';
import { ReportPage } from '../report/report';
import { KnowPage } from '../know/know';
import { SummaryPage } from '../summary/summary';
import { TestPage } from '../test-page/test-page';
import { PushNotificationsHandlerProvider } from '../../providers/push-notifications-handler/push-notifications-handler';
import { MessageModel } from '../../models/message.model';
import { Observable } from 'rxjs/Rx';
import { MessagesProvider } from '../../providers/storage/messages-provider';
import { AppointmentsProvider } from '../../providers/storage/appointments-provider';
import { TasksProvider } from '../../providers/storage/tasks-provider';

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

  public pendingMessages: number;

  @ViewChild("homeTabs") homeTabs: Tabs;
  constructor(public navCtrl: NavController,
    protected pushHandler: PushNotificationsHandlerProvider,
    private messagesProvider: MessagesProvider,
    private appointmentsProvider: AppointmentsProvider,
    private tasksProvider: TasksProvider) {
    //Init push notifications handler
    pushHandler.init();
    messagesProvider.update().subscribe();

    if (pushHandler.getPushObject() != undefined) {
      pushHandler.getPushObject().on('notification')
        .subscribe((notification: any) => {
          console.info('Received a notification', notification);
          messagesProvider.update()
          .subscribe(() => {
            if (!notification.additionalData.foreground) {
              if (this.homeTabs != undefined) {
                this.homeTabs.select(3);
              }
            }
          }
          );
        });
    }
    this.messagesProvider.getObservableMessagesCount().subscribe(msgsCnt => this.pendingMessages = msgsCnt);
  }

  ionViewDidLoad() {
    //TODO - set timer to update every 30 min or so
   this.appointmentsProvider.update()
      .subscribe(appointments => {
        console.debug("Updated Appointemnts", appointments);
        this.tasksProvider.update()
        .subscribe((tasks) => console.debug("Updated Tasks: ", tasks));
      })
  }

  ionViewDidUnload() {

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

  public restartMessageCount() {
    this.messagesProvider.setNewMessagesCount(0);
  }

  public getPendingMessages() {
    return this.messagesProvider.getNewMessagesCount();
  }

}
