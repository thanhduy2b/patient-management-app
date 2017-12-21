import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PatientRoutingModule
  ],
  declarations: [ PatientRoutingModule.components ]
})
export class PatientModule { }
