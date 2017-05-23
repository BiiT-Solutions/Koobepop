import { ComponentFixture, async } from '@angular/core/testing';
import { AgendaPage } from './agenda';
import { TestUtils } from '../../test';
import { TaskItemComponent } from '../../components/task/taskItem';

let fixture: ComponentFixture<AgendaPage> = null;
let instance: any = null;

describe('Home page', () => {
  beforeEach(async(() => TestUtils.beforeEachCompiler([TaskItemComponent,AgendaPage]).then((compiled:{ fixture: any, instance: any }) => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the agenda page', async () => {
    expect(instance).toBeTruthy();
  });

  it('should start with three days: yesterday today and tomorrow',async()=>{
    expect(instance.days.length()).toBe(3);
    expect(instance.days[0]).toBeLessThan(new Date().getTime())
    expect(instance.days[2]).toBeGreaterThan(new Date().getTime())
  });
  
})
