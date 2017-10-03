import { browser, protractor, WebElement } from 'protractor';
import { Page } from '../app.po';
export class WorkBookPage extends Page {

  public getFirstTask() {
    return browser.findElements(protractor.by.css('ion-slide'))
      .then(slides => slides[1])//center slide
      .then(slide => slide.findElement(protractor.by.css('task-item')))
  }

  public getTaskText(task: WebElement) {
    return task.findElement(protractor.by.css('ion-label')).getText()
  }

  public getTaskIsChecked(task: WebElement) {
    return task.findElement(protractor.by.css('kpp-check-box'))
               .getAttribute('ng-reflect-checked');
  }

  public clickTask(task: WebElement) {
    return task.findElement(protractor.by.css('ion-item')).click();
  }

  public clickTaskInfo(task: WebElement) {
    return task.findElement(protractor.by.css('button')).click();
  }

  public getTodayButton(){
    return browser.findElement(protractor.by.css('#today-button'))
  }

  public getSlides() {
    return browser.findElement(protractor.by.css('ion-slides'));
  }

  public slideRight() {
    return this.getSlides()
      .then(el => browser.actions().dragAndDrop(el, { x: 100, y: 0 }).perform())
  }
  public slideLeft() {
    return this.getSlides()
      .then(el => browser.actions().dragAndDrop(el, { x: -100, y: 0 }).perform())
  }


  public getHeader() {
    return browser.findElement(protractor.by.css('div.header'))
  }

  public getEffort(selection: string) {
    let cssClass = "";
    switch (selection) {
      case 'easy':
        cssClass = "effort-easy";
        break;
      case 'normal':
        cssClass = "effort-normal";
        break;
      case 'hard':
        cssClass = "effort-hard";
        break;
      default:
        cssClass = "effort-painful";
    }
    return browser.findElement(protractor.by.css('.' + cssClass))
      .findElement(protractor.by.css('ion-radio'));
  }

  public getConfirm(selection:string){
    let cssClass = ""
    switch(selection.toLocaleLowerCase()){
      case "yes":
      cssClass = "confirm"
      break;
      default:
      cssClass = "deny"
    }
    return browser.findElement(protractor.by.css('.' + cssClass))
    .findElement(protractor.by.css('ion-radio'));

  }

}
