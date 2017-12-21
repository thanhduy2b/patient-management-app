import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './patient.component';
import { PatientDetailsComponent } from './patient-details.component';
import { PatientEditComponent } from './patient-edit.component';
import { PatientAppointmentsComponent } from './patient-appointments.component';
import { CanActivateGuard } from '../core/can-activate.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      { path: 'details', component: PatientDetailsComponent },
      { path: 'appointments', component: PatientAppointmentsComponent },
      { path: 'edit',
        component: PatientEditComponent,
        canDeactivate: [ CanDeactivateGuard ]
      }
    ],
    canActivate: [ CanActivateGuard ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateGuard, CanDeactivateGuard ]
})
export class PatientRoutingModule {
  static components = [ PatientComponent, PatientDetailsComponent, PatientEditComponent, PatientAppointmentsComponent ];
}
