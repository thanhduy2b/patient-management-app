import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SorterService } from '../core/services/sorter.service';
import { TrackByService } from '../core/services/trackby.service';
import { IPatient } from '../shared/interfaces';

@Component({
  selector: 'pm-patients-grid',
  templateUrl: './patients-grid.component.html',
  styleUrls: [ './patients-grid.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsGridComponent implements OnInit {

  @Input() patients: IPatient[] = [];

  constructor(private sorterService: SorterService, public trackbyService: TrackByService) { }

  ngOnInit() {
  }

  sort(prop: string) {
      this.sorterService.sort(this.patients, prop);
  }
}
