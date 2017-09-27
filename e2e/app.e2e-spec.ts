import { Page } from './app.po';

describe('IGOW', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('Default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });
    /*
    it('should have a title saying Login', () => {
        page.getTitle().then(title => {
          expect(title).toEqual('IGOW');
        });
    });*/

    it('should show a login screen', () => {
      const textField = page.getFieldText()
      textField.getText().then(text => {
        expect(text).toEqual("Id:");
      });
    });

    it('should be fillable', () => {
      const textField = page.getField()
      textField.sendKeys('000000001').then(()=>{
      const button = page.getButton();
      button.getText().then(text=>console.log("############",text))

      })
    })
  })

});
