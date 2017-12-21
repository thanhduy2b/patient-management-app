import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IPatient } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({
  selector: 'pm-patients-card',
  templateUrl: './patients-card.component.html',
  styleUrls: [ './patients-card.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsCardComponent implements OnInit {

  @Input() patients: IPatient[] = [];

  constructor(public trackbyService: TrackByService) { }

  ngOnInit() {
  }
}
