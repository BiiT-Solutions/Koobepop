import { Injectable } from '@angular/core';
import { UserGuardProvider } from '../user-guard/user-guard';
import { SettingsProvider } from '../storage/settings/settings';


@Injectable()
export class VariablesProvider {
  readonly USER_GUARD_VARIABLE = "{{USER_CODE}}";
  readonly SERVER_VARIABLE = "{{SERVER_URL}}";
  userCode = " ";

  constructor(
    protected userGuardService: UserGuardProvider,
    protected settings: SettingsProvider
  ) {
    this.settings.load().subscribe();
  }

  public replaceVariables(text: string) {
    if (text.includes(this.USER_GUARD_VARIABLE)) {

      if (this.userCode == " ") {
        this.getGuard().subscribe(() => {
          this.startCountdownuntdown(120);
          text = text.replace(this.USER_GUARD_VARIABLE, this.userCode);
          console.log("Replaced user guard on ", text);
        })
      } else {
        text = text.replace(this.USER_GUARD_VARIABLE, this.userCode);
        console.log("Replaced user guard on ", text);
      }
    }
    if (text.includes(this.SERVER_VARIABLE)) {
      text = text.replace(this.SERVER_VARIABLE, this.getHostUrl());
      console.log("Replaced server url on ", text);
    }
    return text;
  }

  private getHostUrl() {
    var url = new URL(this.settings.allSettings.backend);
    url.protocol;  // "http:"
    url.hostname;  // "aaa.bbb.ccc.com"
    return url.protocol + "//" + url.hostname;
  }

  private getGuard() {
    return this.userGuardService.requestUserGuard()
      .map(guard => {
        this.userCode = guard.code
        return guard;
      })
  }

  private startCountdownuntdown(seconds) {
    var counter = seconds;

    var interval = setInterval(() => {
      counter--;
      //if usercode is less that 5 will consider as expired
      if (counter < 5) {
        this.userCode = " "
        clearInterval(interval);
      };
    }, 1000);
  }
}
