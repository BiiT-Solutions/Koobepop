import { Injectable } from '@angular/core';
import { UserGuardProvider } from '../user-guard/user-guard';


@Injectable()
export class VariablesProvider {
  readonly USER_GUARD_VARIABLE = "${USER_CODE}";
  userCode = " ";

  constructor(
    public userGuardService: UserGuardProvider
  ) {

  }

  public replaceVariables(text: string) {
    if (text.includes(this.USER_GUARD_VARIABLE)) {

      if (this.userCode == " ") {
        this.getGuard().subscribe(() => {
          this.startCountdownuntdown(120);
          console.log("Replacing user guard on ", text, " with ", this.userCode);
          text = text.replace(this.USER_GUARD_VARIABLE, this.userCode);
        })
      } else {
        console.log("Replacing user guard on ", text, " with ", this.userCode);
        text = text.replace(this.USER_GUARD_VARIABLE, this.userCode);
        console.log("Final result ", text);
      }
    }
    return text;
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
