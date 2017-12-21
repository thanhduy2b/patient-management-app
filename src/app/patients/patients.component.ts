import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IPatient, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';

@Component({
  selector: 'pm-patients',
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {

  title: string;
  filterText: string;
  patients: IPatient[] = [];
  filteredPatients: IPatient[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private dataService: DataService, private filterService: FilterService) { }

  ngOnInit() {
    this.title = 'Patients';
    this.filterText = 'Filter Patients:';
    this.displayMode = DisplayModeEnum.Card;

    this.getPatientsPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getPatientsPage(page);
  }

  getPatientsPage(page: number) {
    this.dataService.getPatientsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IPatient[]>) => {
          this.patients = this.filteredPatients = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getPatientsPage() retrieved patients for page: ' + page));
  }

  filterChanged(data: string) {
    if (data && this.patients) {
        data = data.toUpperCase();
        const props = ['firstName', 'lastName', 'gender', 'email', 'mobile'];
        this.filteredPatients = this.filterService.filter<IPatient>(this.patients, data, props);
    }
    else {
      this.filteredPatients = this.patients;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1
}
