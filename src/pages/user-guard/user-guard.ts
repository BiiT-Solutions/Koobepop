import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { UserGuardProvider } from '../../providers/user-guard/user-guard';

@Component({
  selector: 'page-user-guard',
  templateUrl: 'user-guard.html',
})
export class UserGuardPage {
  userGuard: string = " ";
  expirationDate;
  timeLeft = 0;
  initialTimeLeft = 0;
  generationTime
  timeout;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userGuardService: UserGuardProvider
  ) {  }

  ionViewWillEnter() {
    this.tickClock();
      console.log(this.expirationDate)
  }

  ionViewDidLoad() {
    
  }

  public tickClock() {
    this.timeLeft = Math.max(0, moment(this.expirationDate).diff(moment()).valueOf())
    if (this.timeLeft > 0) {
      this.timeout = setTimeout(() => { this.tickClock() }, 1000);
    } else {
      this.getGuard()
        .subscribe(() => this.timeout = setTimeout(() => { this.tickClock() }, 1000))
    }
  }

  getGuard() {
    return this.userGuardService.requestUserGuard()
      .map(guard => {
        this.userGuard = guard.code
        this.expirationDate = guard.expirationTime
        this.generationTime = guard.generationTime
        this.initialTimeLeft = Math.max(0, moment(this.expirationDate).diff(moment(this.generationTime)).valueOf())
        this.timeLeft = Math.max(0, moment(this.expirationDate).diff(moment()).valueOf())
        return guard;
      })
  }

  ionViewWillLeave() {
    clearTimeout(this.timeout)
  }

}
