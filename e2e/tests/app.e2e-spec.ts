import { Page } from '../app.po';
import { LoginPage } from '../pages/login.po';
import { WorkBookPage } from '../pages/workbook.po';
import { ReportPage } from '../../src/pages/report/report';
import { KnowPage } from '../pages/know.po';
import { TrackerPage } from '../pages/tracker.po';
import * as moment from 'moment';

describe('IGOW', () => {
  let page: Page

  beforeEach(() => {
    page = new Page();
    page.navigateTo('/');
  });

  /******LOGIN******/
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
    });

    it('should be loged into the app', () => {
      page.getTitle().then(title => {
        expect(title).toBe('IGOW')
      });
    });

    it('should load some task into view', () => {
      workbookPage.wait()
        .then(() => workbookPage.getFirstTask())
        .then(task =>
          workbookPage.getTaskText(task))
        .then(text => {
          expect(text).toBe('Task 1');
          taskName = text;
        })
    });

    it('should click and enter the task information', () => {
      workbookPage.getFirstTask()
        .then(task => workbookPage.clickTaskInfo(task))
        .then(() => workbookPage.sleep(500))
        .then(() => workbookPage.getTitle())
        .then(text => expect(text).toBe(taskName))
    });

    it('should perform the task and assign some difficulty', () => {
      workbookPage.getFirstTask()
        .then(task => {
          return workbookPage.getTaskIsChecked(task).then(isChecked => expect(isChecked).toBe('false'))
            .then(() => task);
        })
        .then(task => workbookPage.clickTask(task))
        .then(() => workbookPage.sleep(1000))
        .then(() => workbookPage.getEffort('easy'))
        .then((el) => el.click())
        .then(() => workbookPage.sleep(1000))
        .then(() => workbookPage.getFirstTask())
        .then(task => {
          return workbookPage.getTaskIsChecked(task).then(isChecked => expect(isChecked).toBe('true'))
            .then(() => task);
        })
    })

    it('should unperform the task', () => {
      workbookPage.getFirstTask()
        .then(task => {
          return workbookPage.getTaskIsChecked(task).then(isChecked => expect(isChecked).toBe('true'))
            .then(() => task);
        })
        .then(task => workbookPage.clickTask(task))
        .then(() => workbookPage.sleep(1000))
        .then(() => workbookPage.getConfirm('yes'))
        .then((el) => el.click())
        .then(() => workbookPage.sleep(1000))
        .then(() => workbookPage.getFirstTask())
        .then(task => {
          return workbookPage.getTaskIsChecked(task).then(isChecked => expect(isChecked).toBe('false'))
            .then(() => task);
        })
    })

    it('should move between days', () => {
      workbookPage.getHeader()
        .then(header => header.getText())
        .then((date) => {
          const d = new Date(date).getDate()
          expect(d).toBe(new Date(Date.now()).getDate())
        })
        .then(() => workbookPage.slideRight())
        .then(() => workbookPage.sleep(500))
        .then(() => workbookPage.getHeader())
        .then(header => header.getText())
        .then(date => {
          const d = new Date(date).getDate()
          expect(d).toBe(new Date(Date.now() - (24 * 60 * 60 * 1000)).getDate())
        })
        .then(() => workbookPage.slideLeft())
        .then(() => workbookPage.sleep(500))
        .then(() => workbookPage.getHeader())
        .then(header => header.getText())
        .then(date => {
          const d = new Date(date).getDate()
          expect(d).toBe(new Date(Date.now()).getDate())
        });
    });

    it('should go back to today when pressing the "today" button', () => {
      workbookPage.getHeader()
        .then(header => header.getText())
        .then((date) => {
          const d = new Date(date).getDate()
          expect(d).toBe(new Date(Date.now()).getDate())
        })
        .then(() => workbookPage.slideRight())
        .then(() => workbookPage.sleep(500))
        .then(() => workbookPage.getHeader())
        .then(header => header.getText())
        .then(date => {
          const d = new Date(date).getDate()
          expect(d).toBe(new Date(Date.now() - (24 * 60 * 60 * 1000)).getDate())
        })
        .then(() => workbookPage.getTodayButton())
        .then(button => button.click())
        .then(() => workbookPage.getHeader())
        .then(header => header.getText())
        .then((date) => {
          const d = new Date(date).getDate()
          expect(d).toBe(new Date(Date.now()).getDate())
        })
    });


  });

  /******KNOW******/
  describe('KnowPage', () => {
    let knowPage: KnowPage
    beforeEach(() => {
      knowPage = new KnowPage();
    });

    it('should change view to KnowPage', () => {
      page.goToKnow()
        .then(() => page.getTitle())
        .then(title => {
          expect(title).not.toBe('Login')
        });
    })

    it('should have a message', () => {
      page.goToKnow()
        .then(() => knowPage.wait())
        .then(() => knowPage.getFirstMessage())
        .then(messageEl => knowPage.getMessageText(messageEl))
        .then(textEl => textEl.getText())
        .then(text => expect(text).toBe('First message'))
    })
  })

  /******REPORT******/
  describe('ReportPage', () => {
    beforeEach(() => {
    });

    it('should change view to Report Page', () => {
      page.goToReports()
        .then(() => page.getTitle())
        .then(title => {
          expect(title).toBe('IGOW')
        });
    })

  })

  /******TRACKER******/
  describe('TrackerPage', () => {
    let trackerPage: TrackerPage;
    beforeEach(() => {
      trackerPage = new TrackerPage();
    });

    it('should change view to Tracker Page', () => {
      page.goToTracker()
        .then(() => page.getTitle())
        .then(title => {
          expect(title).not.toBe('Login')
        });
    })
/*
    it('should fill tasks and show progress ', ()=>{
      const weekstart = moment().startOf('isoWeek');
      const now = moment();
      let day:moment.Moment;
      //if weekstart - now >= 3 days
      if(moment(now.diff(3,'day')).isAfter(weekstart)){
        day=weekstart;
      }else{
         day = moment(now.diff(7,'day'));
      }
      const workWeek = day.week();

      page.goToTracker()
      .then(()=>page.sleep(3000))
      .then(()=>trackerPage.goToIframe())
      .then(()=> trackerPage.getWeekNumber())
      //.then(week => (parseInt(week) < workWeek)?trackerPage.previousWeek():null)
      .then(()=>trackerPage.previousWeek())
      .then(()=>trackerPage.getProgress())


      //go to weekstart, fill 3 days
      //check tracker for this week

      //else
      //goto now -7 days, fill 3 days
      //check tracker for previous week


    });*/
  });

});
