import { ComponentFixture, async } from '@angular/core/testing';
import { HomePage } from './home';
import { TestUtils } from '../../test';

let fixture: ComponentFixture<HomePage> = null;
let instance: any = null;

describe('Home page', () => {
  beforeEach(async(() => TestUtils.beforeEachCompiler([HomePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));


  it('should create the home page', async () => {
    expect(instance).toBeTruthy();
  })
  it('should check if anything is testeable', async () => {
    instance.BOOK_HEIGHT = 2;
    expect(instance.BOOK_HEIGHT).toBeGreaterThanOrEqual(1)
    expect(instance.BOOK_HEIGHT).toBeGreaterThanOrEqual(2)
    expect(instance.BOOK_HEIGHT).toBeLessThanOrEqual(2)
    expect(instance.BOOK_HEIGHT).toBeLessThanOrEqual(3)
  })
})







//beforeEach(() => {
//    homePage = new HomePage(<any>new NavMock,<any> new ManagerMock);
//    homePage.BOOK_HEIGHT = 2;
//  })











