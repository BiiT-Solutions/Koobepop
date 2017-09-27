import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should have a title saying IGOW', () => {
      page.getTitle().then(title => {
        expect(title).toEqual('IGOW');
      });
    });

    it('should show a login screen', () => {
      const textField = page.getField()
      textField.getText().then(text => {
        expect(text).toEqual("");
       });
    })
  })
});
