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

    it('should have a title saying IGOW', () => {
        page.getTitle().then(title => {
          expect(title).toEqual('IGOW');
        });
    });

    it('should show a login screen', () => {
      const textField = page.getIdTextField()
      textField.getText().then(text => {
        expect(text).toEqual("Id:");
      });
    });

    it('should be fillable', () => {
      const textField = page.getField()
      textField.sendKeys('000000001').then(()=>{
      const button = page.getSendIdButton();
      button.click().then(()=>{
        page.getSendCredentialsButton().then(item=>item.click())
      });
      })
    })
  })

});
