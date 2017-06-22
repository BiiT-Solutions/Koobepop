import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBarMock, SplashScreenMock } from '../mocks';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: Root Component', () => {
  /** Configure TestBed with the adequate dependencies */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock }

      ],
      imports: [
        IonicModule.forRoot(MyApp)
      ]
    }).compileComponents();
  }));

  /**This will trigger once the TestBed configuration is finished*/
  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
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

  it('initialises with a root page of HomePage', () => {
    expect(comp['rootPage']).toBe(HomePage);
  });
});
