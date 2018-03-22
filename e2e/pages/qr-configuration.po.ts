import { browser, protractor } from 'protractor';
import { Page } from '../app.po';
export class QRConfigurationPage extends Page {
  public SERVER_CONFIG = 'fce49af8bb8bb9965913f678388fe43ad0a2fca731eb4fd804f148e288e457790fffe716c10bdce0ea39101132d1c4ba4ba66712bdbb7c9386f7632046401b6ff130cc29fd85c9d266c4d1a591c42d26be20326f2ca00d7f150262e0e0797842a76cb380eae40fc40a46268cad4ff255e2dd9b8a06d5855840194ea8cbe691c39a3f1c11b5247fdc46b9ccf35d6697ad732515b0993f9387b4af4695b345285e78647a40f8d7f14c1c1c3536612e58a0';

  getConfigurationFieldLabel() {
    return browser.findElement(protractor.By.css('ion-label'));
  }

  getConfigurationField() {
    return browser.findElement(protractor.by.css('input'));
  }

  getSendConfigurationButton() {
    return browser.findElement(protractor.by.css('#send-id'))
  }

  getSendCredentialsButton() {
    return browser.waitForAngular()
    .then(() => browser.findElement(protractor.by.css('#send-key')));
  }

  register() {
    return this.getConfigurationField().sendKeys(this.SERVER_CONFIG)
      .then(() => this.getSendConfigurationButton().click());
  }
}
