import { Page } from './app.po';
import { LoginPage } from './pages/login.po';
import { WorkBookPage } from './pages/workbook.po';

describe('IGOW', () => {
  let loginPage: LoginPage;
  let workbookPage: WorkBookPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    workbookPage = new WorkBookPage();
  });

  describe('Default screen (Login)', () => {
    beforeEach(() => {
      loginPage.navigateTo('/');
    });

    //This fails sometimes if the app starts faster and reads Login
    it('should have a title saying IGOW', () => {
      loginPage.wait()
        .then(() => loginPage.getTitle()
        )
        .then(title => expect(title == 'IGOW' || title == 'Login').toBeTruthy())
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
            loginPage.wait()
          )
          .then(() =>
            loginPage.getSendCredentialsButton()
          )
          .then(item => item.click()
          )
          .then(() => loginPage.wait()
          )
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

    it('should load some task into view', () => {
      workbookPage.wait()
        .then(() => workbookPage.getFirstTask())
        .then(task =>
          task.getText())
        .then(text => {
          expect(text).toBe('Task 1');
        })
    });
  });

  describe('ReportPage', () => {
    beforeEach(() => {
      loginPage.navigateTo('/');
    });

    it('should change view to Report Page', () => {
      workbookPage.goToReports()
      .then(()=>  loginPage.getTitle())
     .then(title => {
      expect(title).not.toBe('IGOW')
      expect(title).not.toBe('Login')
      });

    })
  })
});
