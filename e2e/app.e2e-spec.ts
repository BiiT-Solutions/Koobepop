import { Page } from './app.po';
import { LoginPage } from './pages/login.po';
import { WorkBookPage } from './pages/workbook.po';
import { ReportPage } from '../src/pages/report/report';
import { KnowPage } from './pages/know.po';

describe('IGOW', () => {
  let page: Page

  beforeEach(() => {
    page = new Page();
    page.navigateTo('/');
  });

  describe('Default screen (Login)', () => {
    let loginPage: LoginPage;

    beforeEach(() => {
      loginPage = new LoginPage();

    });

    it('should have a title saying "IGOW" or "Login"', () => {
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

  /******WORKBOOK******/
  describe('Default screen (WorkBook)', () => {
    let workbookPage: WorkBookPage;
    let taskName;
    beforeEach(() => {
      workbookPage = new WorkBookPage();
     // page.navigateTo('/');
    });

    it('should be loged into the app', () => {
      page.getTitle().then(title => {
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
          taskName = text;
        })
    });

    it('should click the task',()=>{
    workbookPage.getFirstTask()
      .then(task=>task.click())
      .then(()=>workbookPage.wait())
      //.then(()=>workbookPage)
    })

  });

  describe('KnowPage', () => {
    let knowPage: KnowPage
    beforeEach(() => {
      //page.navigateTo('/');
      knowPage = new KnowPage();
    });

    it('should change view to Know Page', () => {
      page.goToKnow()
        .then(() => page.getTitle())
        .then(title => {
          expect(title).not.toBe('IGOW')
          expect(title).not.toBe('Login')
        });
    })

    it('should have a message', () => {
      page.goToKnow()
      .then(()=>knowPage.wait())
      .then(()=>knowPage.getFirstMessage())
      .then(messageEl=>knowPage.getMessageText(messageEl))
      .then(textEl=>textEl.getText())
      .then(text=>expect(text).toBe('First message'))
    })
  })

  describe('ReportPage', () => {
    beforeEach(() => {
     // page.navigateTo('/');
    });

    it('should change view to Report Page', () => {
      page.goToReports()
        .then(() => page.getTitle())
        .then(title => {
          expect(title).not.toBe('IGOW')
          expect(title).not.toBe('Login')
        });
    })
  })

  describe('TrackerPage', () => {
    beforeEach(() => {
      //page.navigateTo('/');
    });

    it('should change view to Tracker Page', () => {
      page.goToTracker()
        .then(() => page.getTitle())
        .then(title => {
          expect(title).not.toBe('IGOW')
          expect(title).not.toBe('Login')
        });
    })
  })

});
