import { browser, protractor } from 'protractor';
import { Page } from '../app.po';
export class WorkBookPage extends Page {

  public getFirstTask() {
    return browser.findElements(protractor.by.css('ion-slide'))
    .then(slides=>slides[1])//center slide
    .then(slide=>slide.findElement(protractor.by.css('ion-label')))
  }

  public getSlides() {
    return browser.findElement(protractor.by.css('ion-slides'));
  }

  public slideRight(){}
  public slideLeft(){}
  public clickTask(taskName:string){
    return browser.findElements(protractor.by.css('ion-slide'))
    .then(slides=>slides[2])//center slide
    .then(()=>browser.findElements(protractor.by.cssContainingText('ion-label',taskName)))
    .then(tasks=>tasks[0].click());
  }
  public clickTaskInfo(taskName:string){
  }

}
