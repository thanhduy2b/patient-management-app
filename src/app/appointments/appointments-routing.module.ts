import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsComponent } from './appointments.component';

import { CanActivateGuard } from '../core/can-activate.guard';

const routes: Routes = [
  { path: '', component: AppointmentsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateGuard ]
})
export class AppointmentsRoutingModule {
  static components = [ AppointmentsComponent ];
}
