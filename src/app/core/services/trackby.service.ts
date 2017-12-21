import { Injectable } from '@angular/core';

import { IPatient, IAppointment } from '../../shared/interfaces';

@Injectable()
export class TrackByService {

  patient(index: number, patient: IPatient) {
    return patient.id;
  }

  appointment(index: number, appointment: IAppointment) {
    return index;
  }
}
