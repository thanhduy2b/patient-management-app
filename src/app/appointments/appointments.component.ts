import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IPatient, IPagedResults } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({
    selector: 'pm-patients-appointments',
    templateUrl: './appointments.component.html'
})
export class AppointmentsComponent implements OnInit {

    patients: IPatient[];
    totalRecords: number = 0;
    pageSize: number = 5;

    constructor(private dataService: DataService, private trackbyService: TrackByService) { }

    ngOnInit() {
        this.getPatientsPage(1);
    }

    pageChanged(page: number) {
        this.getPatientsPage(page);
    }

    getPatientsPage(page: number) {
        this.dataService.getPatientsPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe((response: IPagedResults<IPatient[]>) => {
                this.totalRecords = response.totalRecords;
                this.patients = response.results;
            });
    }
}
