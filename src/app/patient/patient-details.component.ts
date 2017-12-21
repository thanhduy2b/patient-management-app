import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IPatient } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'pm-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: [ './patient-details.component.css' ]
})
export class PatientDetailsComponent implements OnInit {

  patient: IPatient;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
      // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = params['id'];
        this.dataService.getPatient(id)
            .subscribe((patient: IPatient) => {
              this.patient = patient;
            });
      });
  }
}
