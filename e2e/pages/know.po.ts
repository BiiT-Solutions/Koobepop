import { browser, protractor } from 'protractor';
import { Page } from '../app.po';
export class KnowPage extends Page {

  public getFirstMessage() {
    return browser.findElements(protractor.by.css('ion-card'))
      .then(messages => messages[messages.length - 1])
  }

  public getMessageText(messageEl) {
    return messageEl.findElement(protractor.by.css('ion-card-content'))
      .then(cardContent => cardContent.findElement(protractor.by.css('p')))
  }

}
