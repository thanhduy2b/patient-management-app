import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AppointmentsRoutingModule } from './appointments-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AppointmentsRoutingModule
  ],
  declarations: [ AppointmentsRoutingModule.components ]
})
export class AppointmentsModule { }
