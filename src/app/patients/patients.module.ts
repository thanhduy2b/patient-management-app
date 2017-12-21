import { NgModule } from '@angular/core';

import { SharedModule }   from '../shared/shared.module';
import { PatientsRoutingModule } from './patients-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PatientsRoutingModule
  ],
  declarations: [ PatientsRoutingModule.components ]
})
export class PatientsModule { }
