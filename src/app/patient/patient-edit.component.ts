import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { IPatient } from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';

@Component({
  selector: 'pm-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: [ './patient-edit.component.css' ]
})
export class PatientEditComponent implements OnInit {

  patient: IPatient =
  {
    id: "0",
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: ''
  };
  genders: string[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  @ViewChild('patientForm') patientForm: NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private growler: GrowlerService,
              private modalService: ModalService) { }

  ngOnInit() {
      //Subscribe to params so if it changes we pick it up. Don't technically need that here
      //since param won't be changing while component is alive.
      //Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = +params['id'];
        if (id != 0) {
          this.operationText = 'Update';
          this.getPatient('' + id);
        }
      });

      this.dataService.getGenders().subscribe((genders: string[]) => this.genders = genders);
  }

  getPatient(id: string) {
      this.dataService.getPatient(id).subscribe((patient: IPatient) => {
        this.patient = patient;
      });
  }

  submit() {
      if (this.patient.id === "0") {
        this.dataService.insertPatient(this.patient)
          .subscribe((insertedPatient: IPatient) => {
            if (insertedPatient) {
              //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
              this.patientForm.form.markAsPristine();
              this.router.navigate(['/patients']);
            } else {
              const msg = 'Unable to insert patient';
              this.growler.growl(msg, GrowlerMessageType.Danger);
              this.errorMessage = msg;
            }
          },
          (err: any) => console.log(err));
      } else {
        this.dataService.updatePatient(this.patient)
          .subscribe((status: boolean) => {
            if (status) {
              //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
              this.patientForm.form.markAsPristine();
              this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
            }
            else {
              const msg = 'Unable to update patient';
              this.growler.growl(msg, GrowlerMessageType.Danger);
              this.errorMessage = msg;
            }
        },
        (err: any) => console.log(err));
      }
  }

  cancel(event: Event) {
    event.preventDefault();
    //Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/patients']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deletePatient(this.patient.id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/patients']);
          }
          else {
            this.errorMessage = 'Unable to delete patient';
          }
        },
        (err) => console.log(err));
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.patientForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    }
    return this.modalService.show(modalContent);
  }
}
