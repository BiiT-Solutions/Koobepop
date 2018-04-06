import { Page } from '../app.po';
import { LoginPage } from '../pages/login.po';
import { WorkBookPage } from '../pages/workbook.po';
import { ReportPage } from '../../src/pages/report/report';
import { KnowPage } from '../pages/know.po';
import { TrackerPage } from '../pages/tracker.po';
import { QRConfigurationPage } from '../pages/qr-configuration.po'
import * as moment from 'moment';
import { browser } from 'protractor';

/**
 * Useful commands:
 * 
 * browser.pause() 
 * 
 */
describe('iGROW Application tests', () => {
  let page: Page

  beforeEach(() => {
    page = new Page();
    page.navigateTo('/');
  });

  /******CONFIGURATION & LOGIN******/
  describe('Configuration and Login', () => {
    let loginPage: LoginPage;

    beforeEach(() => {
      loginPage = new LoginPage();

    });
    //Initialization
    it('should have a title saying "iGROW"', () => {
      loginPage.wait()
        .then(() => loginPage.getTitle()
        )
        .then(title => expect(title == 'iGROW').toBeTruthy())
    });

    //Configure application


    it('should configure the app with an encrypted code', (done) => {
      let qrConfigurationPage = new QRConfigurationPage();
      const textField = qrConfigurationPage.getConfigurationFieldLabel()
      textField.getText()
        .then(text =>
          expect(text).toEqual("Paste your code here:")//"Introduce the id that you provided in your intake form, we will send you a verification code to the phone number of that same intake form.")
        )
        //Try wrong configuration 
        .then(() => {
          const textField2 = qrConfigurationPage.getConfigurationField()
          return textField2.sendKeys("nosense")
        })
        .then(() => {
          let button = qrConfigurationPage.getSendConfigurationButton();
          // browser.pause();
          return qrConfigurationPage.sleep(200).then(() => button.click())
        })
        //Try Testing environment configuration 
        .then(() => {
          const textField2 = qrConfigurationPage.getConfigurationField()
          return textField2.clear().then(() => textField2.sendKeys(qrConfigurationPage.SERVER_CONFIG))
        })
        .then(() => {
          let button = qrConfigurationPage.getSendConfigurationButton();
          return button.click()
        })
        .then(() => qrConfigurationPage.sleep(1000))
        .then(() => {
          return loginPage.getTitle()
        })
        .then(title => {
          expect(title).toBe('Login')
          done();
        })
    });

    it('should show a page to fill the authentication code', (done) => {
      loginPage.getTitle()
        .then((title) => {
          return expect(title).toBe('Login')
        })
        .then(() => {
          const textField = loginPage.getIdFieldLabel()
          return textField.getText()
        })
        .then(text => {
          expect(text).toEqual("Code:")
          done()
        }
        )
    });

    it('should accept a blank code in the testing environment', (done) => { 
    loginPage.getSendCredentialsButton()
          .then(item => item.click())
          .then(()=>page.sleep(1000))
          .then(()=>page.getTitle())
          //For some reason ionic loses the page name here
          .then(title=>expect(title).toBe(""))
          .then(()=>done())
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
        expect(title).toBe('iGROW')
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
          return workbookPage.getTaskIsChecked(task)
            .then(isChecked => expect(isChecked).toBe('false'))
            .then(() => task);
        })
        .then(task => workbookPage.clickTask(task))
        .then(() => workbookPage.sleep(1000))
        .then(() => workbookPage.getSelection('Easy'))
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
        .then(() => workbookPage.getSelection('Yes'))
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
          expect(title).toBe('iGROW')
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
