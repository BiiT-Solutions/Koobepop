import { browser, protractor } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getField(){
    return browser.findElement(protractor.By.css('ion-input'));
  }
}
