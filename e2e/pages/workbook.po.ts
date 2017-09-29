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
  public clickTask(taskName:string){}
  public clickTaskInfo(taskName:string){}

}
