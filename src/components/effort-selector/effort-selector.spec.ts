
import { TranslateService, TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffortSelectorComponent } from './effort-selector';
import { App, Config, DomController, Form, IonicModule, Keyboard, Platform, ViewController } from 'ionic-angular';
import { TranslateServiceMock, ConfigMock, ViewControllerMock } from '../../../test-config/mocks-ionic';
import { MockPlatform } from 'ionic-angular/util/mock-providers';

describe('EffortSelectorComponent:', () => {

    let comp: EffortSelectorComponent;
    let fixture: ComponentFixture<EffortSelectorComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [EffortSelectorComponent],
            providers: [
                App,
                Form,
                Keyboard,
                { provide: Platform, useClass: MockPlatform },
                { provide: TranslateService, useClass:TranslateServiceMock},
                { provide: Config, useValue: ConfigMock },
                {provide: ViewController, useClass: ViewControllerMock}
            ],
            imports: [
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
        });
    }));
    beforeEach(()=>{
      fixture = TestBed.createComponent(EffortSelectorComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement;
    })

    describe('.constructor()', () => {
        it('Should be defined', () => {
            expect(comp).toBeDefined();
        });
    });
});
