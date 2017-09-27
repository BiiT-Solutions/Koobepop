import { browser, protractor } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getFieldText(){
    return browser.findElement(protractor.By.css('ion-label'));
  }

  getField(){
    return browser.findElement(protractor.by.css('input'));
  }

  getButton(){
    return browser.findElement(protractor.by.css('button'))
  }

}
