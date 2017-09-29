import { browser, protractor } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  public goToReports(){
    return browser.findElement(protractor.by.cssContainingText('span','Reports')).click();
  }

  public goToWorkBook(){
    return browser.findElement(protractor.by.cssContainingText('span','Work Book')).click();
  }
  public goToTracker(){
    return browser.findElement(protractor.by.cssContainingText('span','Tracker')).click();
  }
  public goToKnow(){
    return browser.findElement(protractor.by.cssContainingText('span','Know')).click();
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
