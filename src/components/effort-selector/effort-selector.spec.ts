import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBarMock, SplashScreenMock } from '../mocks';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EffortSelectorComponent } from './effort-selector';

let comp: EffortSelectorComponent;
let fixture: ComponentFixture<EffortSelectorComponent>;

describe('Component: Root Component', () => {
  /**This will trigger once the TestBed configuration is finished*/
  beforeEach(() => {
    fixture = TestBed.createComponent(EffortSelectorComponent);
    comp = fixture.componentInstance;
  });
  /** Clear references */
  afterEach(() => {
    fixture.destroy();
    comp = null;
  });
  /** */
  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });
});
