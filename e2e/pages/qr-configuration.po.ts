import { browser, protractor } from 'protractor';
import { Page } from '../app.po';
export class QRConfigurationPage extends Page {
  public SERVER_CONFIG = '29a4340d6752c2daa14e2ca1bd99ec19bec0da07f577d5cb22485385db9a904c2932f39b22e01d8ec7fda86ef276d56527d794c8f4a5c8359f87a5bf53a271261f89d85156c2ae2950b663f08f81a621bfb92935a22eb4d51953292c9b243dfca60b2109cf80babe4003706a1d6a21ad3cd9cbec49caf39d7a0b8e0e3f6c37300cd1981acb1a6d01e92c098f36393949cd77040ed051f742b017a59bf1a4b4119eb8ac850e09024f6cfc1dca437f8f000f3fc62b1dd908e955d394162cde1aa2f4c0aed365a4ba1af6870182c22dcb1448ccd14340fa506155e9480011460ede756f07665290130007aae1182fb03a7b33157d289c68bf6a895af060eb36e5c2022a4782ef8c2f5492bb389d23d63186';

  getConfigurationFieldLabel() {
    return browser.findElement(protractor.By.css('ion-label'));
  }

  getConfigurationField() {
    return browser.findElement(protractor.by.css('input'));
  }

  getSendConfigurationButton() {
    return browser.findElement(protractor.by.css('ion-item~button'))
  }

  getSendCredentialsButton() {
    return browser.waitForAngular()
    .then(() => browser.findElement(protractor.by.css('button')));
  }

  register() {
    return this.getConfigurationField().sendKeys(this.SERVER_CONFIG)
      .then(() => this.getSendConfigurationButton().click());
  }
}
