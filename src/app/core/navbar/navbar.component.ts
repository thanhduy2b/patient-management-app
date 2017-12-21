import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../services/auth.service';
import { GrowlerService, GrowlerMessageType } from '../growler/growler.service';

@Component({
    selector: 'pm-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

    isCollapsed: boolean;
    sub: Subscription;

    constructor(private router: Router, private authservice: AuthService, private growler: GrowlerService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    logOut() {
        const isAuthenticated = this.authservice.isAuthenticated;
        if (isAuthenticated) {
            this.authservice.logout()
                .subscribe((status: boolean) => {
                    this.growler.growl('Logged Out', GrowlerMessageType.Info);
                    this.redirectToLogin();
                    return;
                },
                (err: any) => console.log(err));
        }
        this.redirectToLogin();
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }
}
