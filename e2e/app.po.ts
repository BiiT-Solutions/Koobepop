import { browser, protractor } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }
  wait(){
    return browser.waitForAngular();
  }

  pause(){
    return browser.pause();
  }

}
