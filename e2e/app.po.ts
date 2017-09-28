import { browser, protractor } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getIdTextField(){
    return browser.findElement(protractor.By.css('ion-label'));
  }

  getField(){
    return browser.findElement(protractor.by.css('input'));
  }

  getSendIdButton(){
    return browser.findElement(protractor.by.css('#send-id'))
  }

  getSendCredentialsButton(){
    return browser.waitForAngular().then(()=>browser.findElement(protractor.by.css('#send-key')));
  }
}
