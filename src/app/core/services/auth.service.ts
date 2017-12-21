import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { IUserLogin, IApiAuthResponse } from '../../shared/interfaces';

@Injectable()
export class AuthService {

    authUrl: string = '/api/auth';
    isAuthenticated: boolean = false;
    redirectUrl: string;

    constructor(private http: HttpClient) { }

    login(userLogin: IUserLogin) : Observable<boolean> {
        return this.http.post<IApiAuthResponse>(this.authUrl + '/login', userLogin)
            .pipe(
                map(loggedIn => {
                    if(loggedIn && loggedIn.success) {
                      this.isAuthenticated = true;

                      // store token
                      localStorage.setItem('token', loggedIn.token);

                      return true;
                    } else {
                      return false;
                    }
                }),
                catchError(this.handleError)
            );
    }

    logout() {
      this.isAuthenticated = false;

      // clear token
      localStorage.removeItem('token');
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Server error');
    }
}
