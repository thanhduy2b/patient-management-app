import { NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GrowlerModule } from './growler/growler.module';
import { ModalModule } from './modal/modal.module';
import { OverlayModule } from './overlay/overlay.module';

import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { EventBusService } from './services/event-bus.service';
import { FilterService } from './services/filter.service';
import { SorterService } from './services/sorter.service';
import { TrackByService } from './services/trackby.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    GrowlerModule,
    ModalModule,
    OverlayModule
  ],
  exports: [
    GrowlerModule,
    RouterModule,
    HttpClientModule,
    ModalModule,
    OverlayModule,
    NavbarComponent
  ],
  declarations: [ NavbarComponent ],
  providers: [
    AuthService,
    DataService,
    EventBusService,
    FilterService,
    SorterService,
    TrackByService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
