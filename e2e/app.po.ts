import { browser, protractor } from 'protractor';

export class Page {

   waitTimeInMilis = 15000;
   EC = protractor.ExpectedConditions;

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

  public getTitle() {
    return browser.getTitle();
  }

  public wait(){
    return browser.waitForAngular();
  }

  public pause(){
    return browser.pause();
  }

  public sleep(ms){
    return browser.sleep(ms)
  }


  public clearDB(){
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  }
}
