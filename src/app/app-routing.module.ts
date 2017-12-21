import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const app_routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/patients' },
  { path: 'login', component: LoginComponent },
  { path: 'patients/:id', loadChildren: 'app/patient/patient.module#PatientModule' },
  { path: 'patients', loadChildren: 'app/patients/patients.module#PatientsModule' },
  { path: 'appointments', loadChildren: 'app/appointments/appointments.module#AppointmentsModule' },
  { path: '**', pathMatch:'full', redirectTo: '/patients' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
