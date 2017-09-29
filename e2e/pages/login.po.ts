import { browser, protractor } from 'protractor';
import { Page } from '../app.po';
export class LoginPage extends Page {
  public USER_ID = '00000000A';
  getIdFieldLabel() {
    return browser.findElement(protractor.By.css('ion-label'));
  }

  getIdField() {
    return browser.findElement(protractor.by.css('input'));
  }

  getSendIdButton() {
    return browser.findElement(protractor.by.css('#send-id'))
  }

  getSendCredentialsButton() {
    return browser.waitForAngular().then(() => browser.findElement(protractor.by.css('#send-key')));
  }

  login() {
    return this.getIdField().sendKeys(this.USER_ID)
      .then(() => this.getSendIdButton().click()
        .then(() => this.getSendCredentialsButton()
          .then(item => item.click()))
      )
  }
}
