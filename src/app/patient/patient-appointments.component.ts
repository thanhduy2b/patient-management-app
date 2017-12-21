import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../core/services/data.service';
import { TrackByService } from '../core/services/trackby.service';
import { IPatient, IAppointment } from '../shared/interfaces';

@Component({
  selector: 'pm-patient-appointments',
  templateUrl: './patient-appointments.component.html'
})
export class PatientAppointmentsComponent implements OnInit {

  appointments: IAppointment[] = [];
  patient: IPatient;

  constructor(private route: ActivatedRoute, private dataService: DataService, private trackbyService: TrackByService) { }

  ngOnInit() {
      // Subscribe to params so if it changes we pick it up.  Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = params['id'];
        this.dataService.getPatient(id).subscribe((patient: IPatient) => {
          this.patient = patient;
        });
      });
  }
}
