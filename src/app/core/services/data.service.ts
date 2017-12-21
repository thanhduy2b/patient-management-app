import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { IPatient, IPagedResults, IApiResponse } from '../../shared/interfaces';

@Injectable()
export class DataService {

  patientsBaseUrl: string = '/api/patients';

  constructor(private http: HttpClient) { }

  getPatientsPage(page: number, pageSize: number): Observable<IPagedResults<IPatient[]>> {
        return this.http.get<IPatient[]>(
            `${this.patientsBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    let patients = res.body as IPatient[];
                    return {
                        results: patients,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getPatient(id: string): Observable<IPatient> {
      return this.http.get<IPatient>(this.patientsBaseUrl + '/' + id)
        .pipe(
          map(patient => {
            return patient;
          }),
          catchError(this.handleError)
        );
    }

    insertPatient(patient: IPatient): Observable<IPatient> {
      return this.http.post<IPatient>(this.patientsBaseUrl, patient)
        .pipe(catchError(this.handleError));
    }

    updatePatient(patient: IPatient): Observable<boolean> {
      return this.http.put<IApiResponse>(this.patientsBaseUrl + '/' + patient.id, patient)
        .pipe(
          map(res => res.status),
          catchError(this.handleError)
        );
    }

    deletePatient(id: String): Observable<boolean> {
      return this.http.delete<IApiResponse>(this.patientsBaseUrl + '/' + id)
        .pipe(
          map(res => res.status),
          catchError(this.handleError)
        );
    }

    getGenders(): Observable<String[]> {
      return Observable.of(['male', 'female']);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }
}
