import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [ LoginRoutingModule.components ]
})
export class LoginModule { }
