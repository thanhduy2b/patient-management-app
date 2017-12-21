import { async, TestBed } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  ActivatedRoute, ActivatedRouteStub, Router, RouterStub
} from '../testing';

import { Patient }                from '../api/patients/model';
import { PatientComponent } from '../src/app/patient/patient.component';
import { PatientModule }          from '../src/app/patient/patient.module';

let request = require("request");
let activatedRoute: ActivatedRouteStub;

describe('Patient Component', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('With Module setup', ModuleSetup);
});

function ModuleSetup() {
  beforeEach( async(() => {
     TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router,         useClass: RouterStub},
      ]
    })
    .compileComponents();
  }));

  describe("ngOnInit Test", () => {    
      beforeEach( async(() => {
        activatedRoute.testParamMap = { id: params['id'] };
        createComponent();
      }));

      it('id should be zero', () => {
        expect(page.isNewPatient).toBe(id == 0);
      });  
  });
};

