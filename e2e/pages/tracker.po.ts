import { browser, protractor,by } from 'protractor';
import { Page } from '../app.po';
export class TrackerPage extends Page {
  iframe
  brow
  constructor(){
    super();
  }
  public goToIframe(){
    browser.switchTo().frame(browser.driver.findElement(by.css('#tracker-wrapper')))
    browser.ignoreSynchronization = true
  }
  public goToDefault(){
    browser.driver.switchTo().defaultContent();
    browser.ignoreSynchronization = false;
    browser.waitForAngular();
  }

  public nextWeek(){
    return browser.driver.findElement(by.css('#next')).click()
  }

  public previousWeek(){
    return browser.driver.findElement(by.css('#prev')).click()
  }

  public getProgress(){
  }

  public getWeekNumber(){
    return browser.driver.findElement(protractor.by.cssContainingText('span','Selected week '))
    .findElement(protractor.by.css('span')).getText();
  }
}
