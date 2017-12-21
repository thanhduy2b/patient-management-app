import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'pm-patient',
  templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit {

    isNewPatient: boolean;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
      this.route.parent.params.subscribe((params: Params) => {
        let id = params['id'];
        this.isNewPatient = (id == 0);
      });
    }
}
