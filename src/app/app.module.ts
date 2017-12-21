import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { CoreModule }   from './core/core.module';
import { SharedModule }   from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CoreModule,
    SharedModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
