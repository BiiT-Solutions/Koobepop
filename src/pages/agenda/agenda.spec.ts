import { ComponentFixture, async } from '@angular/core/testing';
import { AgendaPage } from './agenda';
import { TestUtils } from '../../test';
import { TaskComponent } from '../../components/task/task';

let fixture: ComponentFixture<AgendaPage> = null;
let instance: any = null;

describe('Home page', () => {
  beforeEach(async(() => TestUtils.beforeEachCompiler([TaskComponent,AgendaPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the home page', async () => {
    expect(instance).toBeTruthy();
  })
  
})
