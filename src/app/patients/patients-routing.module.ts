import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientsCardComponent } from './patients-card.component';
import { PatientsGridComponent } from './patients-grid.component';

import { CanActivateGuard } from '../core/can-activate.guard';

const routes: Routes = [
  { path: '',
    component: PatientsComponent,
    canActivate: [ CanActivateGuard ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateGuard ]
})
export class PatientsRoutingModule {
  static components = [ PatientsComponent, PatientsCardComponent, PatientsGridComponent ];
}
