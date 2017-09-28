import { Page } from './app.po';
import { LoginPage } from './pages/login.po';

describe('IGOW', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  describe('Default screen (Login)', () => {
    beforeEach(() => {
      loginPage.navigateTo('/');
    });

    //This fails sometimes if the app starts faster and reads Login
    it('should have a title saying IGOW', () => {
      loginPage.wait()
        .then(() => loginPage.getTitle()
          .then(title => expect(title).toEqual('IGOW'))
        )

    });

    it('should show a login screen', () => {
      const textField = loginPage.getIdFieldLabel()
      textField.getText()
        .then(text =>
          expect(text).toEqual("Id:")
        );
    });

    it('should be fillable', () => {
      const textField = loginPage.getIdField()
      textField.sendKeys(loginPage.USER_ID).then(() => {
        const button = loginPage.getSendIdButton();
        button.click()
          .then(() =>
            loginPage.getSendCredentialsButton()
              .then(item => item.click()
                .then(() => loginPage.wait())
              )
          );
      });
    });
  });

  describe('Default screen (WorkBook)', () => {
    beforeEach(() => {
      loginPage.navigateTo('/');
    });

    it('should be loged into the app', () => {
      loginPage.getTitle().then(title => {
        expect(title).not.toBe('IGOW')
        expect(title).not.toBe('Login')
      });
    });
  });
});
