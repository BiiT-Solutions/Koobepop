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

})











