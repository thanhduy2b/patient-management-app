import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  ActivatedRoute, ActivatedRouteStub, click, newEvent, Router, RouterStub
} from '../../testing';

import { Patient }                from '../model';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientDetailService }   from './patient-detail.service';
import { PatientModule }          from './patient.module';

let activatedRoute: ActivatedRouteStub;
let comp: PatientDetailComponent;
let fixture: ComponentFixture<PatientDetailComponent>;
let page: Page;

describe('PatientDetailComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('with PatientModule setup', PatientModuleSetup);
  describe('when override its provided PatientDetailService', overrideSetup);
  describe('with FormsModule setup', formsModuleSetup);
  describe('with SharedModule setup', sharedModuleSetup);
});

import { PatientES, FakePatientService } from '../model/testing';
import { PatientService }             from '../model';

const firstPatient = PatientES[0];

function PatientModuleSetup() {
  beforeEach( async(() => {
     TestBed.configureTestingModule({
      imports:   [ PatientModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PatientService,    useClass: FakePatientService },
        { provide: Router,         useClass: RouterStub},
      ]
    })
    .compileComponents();
  }));

  describe('when navigate to existing Patient', () => {
    let expectedPatient: Patient;

    beforeEach( async(() => {
      expectedPatient = firstPatient;
      activatedRoute.testParamMap = { id: expectedPatient.id };
      createComponent();
    }));

    it('should display that Patient\'s name', () => {
      expect(page.nameDisplay.textContent).toBe(expectedPatient.name);
    });

    it('should navigate when click cancel', () => {
      click(page.cancelBtn);
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('should save when click save but not navigate immediately', () => {
      const hds = fixture.debugElement.injector.get(PatientDetailService);
      const saveSpy = spyOn(hds, 'savePatient').and.callThrough();
      click(page.saveBtn);
      expect(saveSpy.calls.any()).toBe(true, 'PatientDetailService.save called');
      expect(page.navSpy.calls.any()).toBe(false, 'router.navigate not called');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      click(page.saveBtn);
      tick(); // wait for async save to complete
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    }));

    it('should convert Patient name to Title Case', () => {
      const inputName = 'quick BROWN  fox';
      const titleCaseName = 'Quick Brown  Fox';

      page.nameInput.value = inputName;

      page.nameInput.dispatchEvent(newEvent('input'));

      fixture.detectChanges();

      expect(page.nameDisplay.textContent).toBe(titleCaseName);
    });
  });

  describe('when navigate with no Patient id', () => {
    beforeEach( async( createComponent ));

    it('should have Patient.id === 0', () => {
      expect(comp.Patient.id).toBe(0);
    });

    it('should display empty Patient name', () => {
      expect(page.nameDisplay.textContent).toBe('');
    });
  });

  describe('when navigate to non-existent Patient id', () => {
    beforeEach( async(() => {
      activatedRoute.testParamMap = { id: 99999 };
      createComponent();
    }));

    it('should try to navigate back to Patient list', () => {
      expect(page.gotoSpy.calls.any()).toBe(true, 'comp.gotoList called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });

  it('cannot use `inject` to get component\'s provided PatientDetailService', () => {
    let service: PatientDetailService;
    fixture = TestBed.createComponent(PatientDetailComponent);
    expect(
      inject([PatientDetailService], (hds: PatientDetailService) =>  service = hds )
    )
    .toThrowError(/No provider for PatientDetailService/);

    service = fixture.debugElement.injector.get(PatientDetailService);
    expect(service).toBeDefined('debugElement.injector');
  });
}

import { FormsModule }         from '@angular/forms';
import { TitleCasePipe }       from '../shared/title-case.pipe';

function formsModuleSetup() {
  beforeEach( async(() => {
     TestBed.configureTestingModule({
      imports:      [ FormsModule ],
      declarations: [ PatientDetailComponent, TitleCasePipe ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PatientService,    useClass: FakePatientService },
        { provide: Router,         useClass: RouterStub},
      ]
    })
    .compileComponents();
  }));

  it('should display 1st Patient\'s name', fakeAsync(() => {
    const expectedPatient = firstPatient;
    activatedRoute.testParamMap = { id: expectedPatient.id };
    createComponent().then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedPatient.name);
    });
  }));
}

import { SharedModule }        from '../shared/shared.module';

function sharedModuleSetup() {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:      [ SharedModule ],
      declarations: [ PatientDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PatientService,    useClass: FakePatientService },
        { provide: Router,         useClass: RouterStub},
      ]
    })
    .compileComponents();
  }));

  it('should display 1st Patient\'s name', fakeAsync(() => {
    const expectedPatient = firstPatient;
    activatedRoute.testParamMap = { id: expectedPatient.id };
    createComponent().then(() => {
      expect(page.nameDisplay.textContent).toBe(expectedPatient.name);
    });
  }));
}

function overrideSetup() {
  class PatientDetailServiceSpy {
    testPatient = new Patient(42, 'Test Patient');

    getPatient = jasmine.createSpy('getPatient').and.callFake(
      () => Promise
        .resolve(true)
        .then(() => Object.assign({}, this.testPatient))
    );

    savePatient = jasmine.createSpy('savePatient').and.callFake(
      (Patient: Patient) => Promise
        .resolve(true)
        .then(() => Object.assign(this.testPatient, Patient))
    );
  }

  beforeEach(() => activatedRoute.testParamMap = { id: 99999 } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ PatientModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router,         useClass: RouterStub},
        // PatientDetailService at this level is IRRELEVANT!
        { provide: PatientDetailService, useValue: {} }
      ]
    })

    .overrideComponent(PatientDetailComponent, {
      set: {
        providers: [
          { provide: PatientDetailService, useClass: PatientDetailServiceSpy }
        ]
      }
    })

    .compileComponents();
  }));

  let hdsSpy: PatientDetailServiceSpy;

  beforeEach( async(() => {
    createComponent();
    // get the component's injected PatientDetailServiceSpy
    hdsSpy = fixture.debugElement.injector.get(PatientDetailService) as any;
  }));

  it('should have called `getPatient`', () => {
    expect(hdsSpy.getPatient.calls.count()).toBe(1, 'getPatient called once');
  });

  it('should display stub Patient\'s name', () => {
    expect(page.nameDisplay.textContent).toBe(hdsSpy.testPatient.name);
  });

  it('should save stub Patient change', fakeAsync(() => {
    const origName = hdsSpy.testPatient.name;
    const newName = 'New Name';

    page.nameInput.value = newName;
    page.nameInput.dispatchEvent(newEvent('input')); // tell Angular

    expect(comp.Patient.name).toBe(newName, 'component Patient has new name');
    expect(hdsSpy.testPatient.name).toBe(origName, 'service Patient unchanged before save');

    click(page.saveBtn);
    expect(hdsSpy.savePatient.calls.count()).toBe(1, 'savePatient called once');

    tick(); // wait for async save to complete
    expect(hdsSpy.testPatient.name).toBe(newName, 'service Patient has new name after save');
    expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
  }));

  it('fixture injected service is not the component injected service',
    inject([PatientDetailService], (service: PatientDetailService) => {

    expect(service).toEqual({}, 'service injected from fixture');
    expect(hdsSpy).toBeTruthy('service injected into component');
  }));
}

function createComponent() {
  fixture = TestBed.createComponent(PatientDetailComponent);
  comp    = fixture.componentInstance;
  page    = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addPageElements();
  });
}

class Page {
  gotoSpy:      jasmine.Spy;
  navSpy:       jasmine.Spy;
  saveBtn:      DebugElement;
  cancelBtn:    DebugElement;
  nameDisplay:  HTMLElement;
  nameInput:    HTMLInputElement;

  constructor() {
    const router = TestBed.get(Router); // get router from root injector
    this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
    this.navSpy  = spyOn(router, 'navigate');
  }

  /** Add page elements after Patient arrives */
  addPageElements() {
    if (comp.Patient) {
      // have a Patient so these elements are now in the DOM
      const buttons    = fixture.debugElement.queryAll(By.css('button'));
      this.saveBtn     = buttons[0];
      this.cancelBtn   = buttons[1];
      this.nameDisplay = fixture.debugElement.query(By.css('span')).nativeElement;
      this.nameInput   = fixture.debugElement.query(By.css('input')).nativeElement;
    }
  }
}
