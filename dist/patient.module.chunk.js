webpackJsonp(["patient.module"],{

/***/ "../../../../../src/app/patient/can-deactivate.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanDeactivateGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CanDeactivateGuard = (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component, route, state) {
        console.log("PatientId: " + route.parent.params['id'] + " URL: " + state.url);
        // Check with component to see if we're able to deactivate
        return component.canDeactivate();
    };
    CanDeactivateGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], CanDeactivateGuard);
    return CanDeactivateGuard;
}());



/***/ }),

/***/ "../../../../../src/app/patient/patient-appointments.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\" *ngIf=\"patient && patient.appointments\">\n        <h4>Appointments for {{ patient.firstName | capitalize }} {{ patient.lastName | capitalize }}</h4>\n        <br />\n        <table class=\"table table-striped table-hover appointments-table\">\n            <tr *ngFor=\"let appointment of patient.appointments;trackBy:trackbyService.appointment\">\n                <td>{{ appointment.dateTime }}</td>\n                <td class=\"text-right\">{{ appointment.notes }}</td>\n                <td class=\"text-right\">{{ appointment.status }}</td>\n            </tr>\n        </table>\n    </div>\n    <div *ngIf=\"patient && !patient.appointments\" class=\"row\">\n        No appointments found\n    </div>\n    <div *ngIf=\"!patient\" class=\"row\">\n        No patient found\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/patient/patient-appointments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientAppointmentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_data_service__ = __webpack_require__("../../../../../src/app/core/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_trackby_service__ = __webpack_require__("../../../../../src/app/core/services/trackby.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PatientAppointmentsComponent = (function () {
    function PatientAppointmentsComponent(route, dataService, trackbyService) {
        this.route = route;
        this.dataService = dataService;
        this.trackbyService = trackbyService;
        this.appointments = [];
    }
    PatientAppointmentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to params so if it changes we pick it up.  Could use this.route.parent.snapshot.params["id"] to simplify it.
        this.route.parent.params.subscribe(function (params) {
            var id = params['id'];
            _this.dataService.getPatient(id).subscribe(function (patient) {
                _this.patient = patient;
            });
        });
    };
    PatientAppointmentsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'pm-patient-appointments',
            template: __webpack_require__("../../../../../src/app/patient/patient-appointments.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__core_services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__core_services_trackby_service__["a" /* TrackByService */]])
    ], PatientAppointmentsComponent);
    return PatientAppointmentsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/patient/patient-details.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".details-image {\n    height:100px;width:100px;margin-top:10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/patient/patient-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"patient\">\n  <div class=\"row\">\n    <div class=\"col-md-2\">\n      <img src=\"assets/images/{{patient.gender | lowercase}}.png\" class=\"details-image\" />\n    </div>\n    <div class=\"col-md-10\">\n      <h4>\n          {{ patient.firstName | capitalize }} {{ patient.lastName | capitalize }}&nbsp;\n      </h4>\n      <br />\n      {{ patient.email }}\n      <br />\n      {{ patient.mobile }}\n    </div>\n  </div>\n</div>\n<div *ngIf=\"!patient\" class=\"container\">\n   No customer found\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/patient/patient-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_data_service__ = __webpack_require__("../../../../../src/app/core/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PatientDetailsComponent = (function () {
    function PatientDetailsComponent(route, dataService) {
        this.route = route;
        this.dataService = dataService;
    }
    PatientDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
        this.route.parent.params.subscribe(function (params) {
            var id = params['id'];
            _this.dataService.getPatient(id)
                .subscribe(function (patient) {
                _this.patient = patient;
            });
        });
    };
    PatientDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'pm-patient-details',
            template: __webpack_require__("../../../../../src/app/patient/patient-details.component.html"),
            styles: [__webpack_require__("../../../../../src/app/patient/patient-details.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__core_services_data_service__["a" /* DataService */]])
    ], PatientDetailsComponent);
    return PatientDetailsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/patient/patient-edit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".patient-form input[type='text'],\n.patient-form input[type='number'],\n.patient-form input[type='email'],\n.patient-form select {\n    width:100%;\n}\n\n.patient-form .ng-invalid {\n  border-left: 5px solid #a94442;\n}\n\n.patient-form .ng-valid {\n  border-left: 5px solid #42A948;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/patient/patient-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <form (ngSubmit)=\"submit()\" #patientForm=\"ngForm\" class=\"patient-form\" novalidate>\n    <div class=\"form-group\">\n      <label>First Name</label>\n      <input type=\"text\" class=\"form-control\" name=\"firstName\" [(ngModel)]=\"patient.firstName\" #firstName=\"ngModel\" required>\n      <div class=\"alert alert-danger\" [hidden]=\"firstName.pristine || firstName.valid\">First Name is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>Last Name</label>\n      <input type=\"text\" class=\"form-control\" name=\"lastName\" [(ngModel)]=\"patient.lastName\" #lastName=\"ngModel\" required>\n      <div class=\"alert alert-danger\" [hidden]=\"lastName.pristine || lastName.valid\">Last Name is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>Gender</label>\n      <select class=\"form-control\"\n              [(ngModel)]=\"patient.gender\"\n              name=\"gender\"\n              required>\n          <option *ngFor=\"let gender of genders\" [ngValue]=\"gender\">{{gender}}</option>\n      </select>\n    </div>\n    <div class=\"form-group\">\n      <label>Email</label>\n      <input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"patient.email\" #email=\"ngModel\" required>\n      <div class=\"alert alert-danger\" [hidden]=\"email.pristine || email.valid\">Email is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label>Mobile</label>\n      <input type=\"text\" class=\"form-control\" name=\"mobile\" [(ngModel)]=\"patient.mobile\" #mobile=\"ngModel\" required>\n      <div class=\"alert alert-danger\" [hidden]=\"mobile.pristine || mobile.valid\">Mobile is required</div>\n    </div>\n    <div *ngIf=\"patient\">\n      <div class=\"alert alert-warning\" *ngIf=\"patient.id && deleteMessageEnabled\">\n         Delete Patient?&nbsp;&nbsp;<button class=\"btn btn-danger\" (click)=\"delete($event)\">Yes</button>&nbsp;&nbsp;\n         <button class=\"btn btn-default\" (click)=\"deleteMessageEnabled = false\">No</button>\n      </div>\n      <button class=\"btn btn-danger\" *ngIf=\"patient.id && !deleteMessageEnabled\" (click)=\"deleteMessageEnabled = true\">Delete</button>&nbsp;&nbsp;\n\n      <div class=\"pull-right\" *ngIf=\"!deleteMessageEnabled\">\n        <button class=\"btn btn-default\" (click)=\"cancel($event)\">Cancel</button>&nbsp;&nbsp;\n        <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"patientForm.pristine || !patientForm.valid\">{{ operationText }}</button>\n      </div>\n    </div>\n    <div class=\"alert alert-danger\" *ngIf=\"errorMessage != null\">{{ errorMessage }}</div>\n  </form>\n  <br />\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/patient/patient-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_data_service__ = __webpack_require__("../../../../../src/app/core/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_modal_modal_service__ = __webpack_require__("../../../../../src/app/core/modal/modal.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_growler_growler_service__ = __webpack_require__("../../../../../src/app/core/growler/growler.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PatientEditComponent = (function () {
    function PatientEditComponent(router, route, dataService, growler, modalService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.growler = growler;
        this.modalService = modalService;
        this.patient = {
            id: "0",
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            mobile: ''
        };
        this.operationText = 'Insert';
    }
    PatientEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Subscribe to params so if it changes we pick it up. Don't technically need that here
        //since param won't be changing while component is alive.
        //Could use this.route.parent.snapshot.params["id"] to simplify it.
        this.route.parent.params.subscribe(function (params) {
            var id = +params['id'];
            if (id != 0) {
                _this.operationText = 'Update';
                _this.getPatient('' + id);
            }
        });
        this.dataService.getGenders().subscribe(function (genders) { return _this.genders = genders; });
    };
    PatientEditComponent.prototype.getPatient = function (id) {
        var _this = this;
        this.dataService.getPatient(id).subscribe(function (patient) {
            _this.patient = patient;
        });
    };
    PatientEditComponent.prototype.submit = function () {
        var _this = this;
        if (this.patient.id === "0") {
            this.dataService.insertPatient(this.patient)
                .subscribe(function (insertedPatient) {
                if (insertedPatient) {
                    //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
                    _this.patientForm.form.markAsPristine();
                    _this.router.navigate(['/patients']);
                }
                else {
                    var msg = 'Unable to insert patient';
                    _this.growler.growl(msg, __WEBPACK_IMPORTED_MODULE_5__core_growler_growler_service__["a" /* GrowlerMessageType */].Danger);
                    _this.errorMessage = msg;
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.updatePatient(this.patient)
                .subscribe(function (status) {
                if (status) {
                    //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
                    _this.patientForm.form.markAsPristine();
                    _this.growler.growl('Operation performed successfully.', __WEBPACK_IMPORTED_MODULE_5__core_growler_growler_service__["a" /* GrowlerMessageType */].Success);
                }
                else {
                    var msg = 'Unable to update patient';
                    _this.growler.growl(msg, __WEBPACK_IMPORTED_MODULE_5__core_growler_growler_service__["a" /* GrowlerMessageType */].Danger);
                    _this.errorMessage = msg;
                }
            }, function (err) { return console.log(err); });
        }
    };
    PatientEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        //Route guard will take care of showing modal dialog service if data is dirty
        this.router.navigate(['/patients']);
    };
    PatientEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deletePatient(this.patient.id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/patients']);
            }
            else {
                _this.errorMessage = 'Unable to delete patient';
            }
        }, function (err) { return console.log(err); });
    };
    PatientEditComponent.prototype.canDeactivate = function () {
        if (!this.patientForm.dirty) {
            return true;
        }
        // Dirty show display modal dialog to user to confirm leaving
        var modalContent = {
            header: 'Lose Unsaved Changes?',
            body: 'You have unsaved changes! Would you like to leave the page and lose them?',
            cancelButtonText: 'Cancel',
            OKButtonText: 'Leave'
        };
        return this.modalService.show(modalContent);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('patientForm'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* NgForm */])
    ], PatientEditComponent.prototype, "patientForm", void 0);
    PatientEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'pm-patient-edit',
            template: __webpack_require__("../../../../../src/app/patient/patient-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/patient/patient-edit.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__core_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_5__core_growler_growler_service__["b" /* GrowlerService */],
            __WEBPACK_IMPORTED_MODULE_4__core_modal_modal_service__["a" /* ModalService */]])
    ], PatientEditComponent);
    return PatientEditComponent;
}());



/***/ }),

/***/ "../../../../../src/app/patient/patient-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__patient_component__ = __webpack_require__("../../../../../src/app/patient/patient.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__patient_details_component__ = __webpack_require__("../../../../../src/app/patient/patient-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__patient_edit_component__ = __webpack_require__("../../../../../src/app/patient/patient-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__patient_appointments_component__ = __webpack_require__("../../../../../src/app/patient/patient-appointments.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_can_activate_guard__ = __webpack_require__("../../../../../src/app/core/can-activate.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__can_deactivate_guard__ = __webpack_require__("../../../../../src/app/patient/can-deactivate.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__patient_component__["a" /* PatientComponent */],
        children: [
            { path: 'details', component: __WEBPACK_IMPORTED_MODULE_3__patient_details_component__["a" /* PatientDetailsComponent */] },
            { path: 'appointments', component: __WEBPACK_IMPORTED_MODULE_5__patient_appointments_component__["a" /* PatientAppointmentsComponent */] },
            { path: 'edit',
                component: __WEBPACK_IMPORTED_MODULE_4__patient_edit_component__["a" /* PatientEditComponent */],
                canDeactivate: [__WEBPACK_IMPORTED_MODULE_7__can_deactivate_guard__["a" /* CanDeactivateGuard */]]
            }
        ],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__core_can_activate_guard__["a" /* CanActivateGuard */]]
    }
];
var PatientRoutingModule = (function () {
    function PatientRoutingModule() {
    }
    PatientRoutingModule.components = [__WEBPACK_IMPORTED_MODULE_2__patient_component__["a" /* PatientComponent */], __WEBPACK_IMPORTED_MODULE_3__patient_details_component__["a" /* PatientDetailsComponent */], __WEBPACK_IMPORTED_MODULE_4__patient_edit_component__["a" /* PatientEditComponent */], __WEBPACK_IMPORTED_MODULE_5__patient_appointments_component__["a" /* PatientAppointmentsComponent */]];
    PatientRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__core_can_activate_guard__["a" /* CanActivateGuard */], __WEBPACK_IMPORTED_MODULE_7__can_deactivate_guard__["a" /* CanDeactivateGuard */]]
        })
    ], PatientRoutingModule);
    return PatientRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/patient/patient.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <header>\n        <h3><span class=\"glyphicon glyphicon-user\"></span>&nbsp;&nbsp;Patient Information</h3>\n    </header>\n    <br />\n    <div class=\"navbar\">\n        <ul class=\"nav navbar-nav\">\n            <li class=\"toolbar-item\" *ngIf=\"!isNewPatient\">\n                <a routerLink=\"details\" routerLinkActive=\"active\">\n                   <span class=\"glyphicon glyphicon-list\"></span>&nbsp;&nbsp;Patient Details\n                </a>\n            </li>\n            <li class=\"toolbar-item\" *ngIf=\"!isNewPatient\">\n                <a routerLink=\"appointments\" routerLinkActive=\"active\">\n                    <span class=\"glyphicon glyphicon-tags\"></span>&nbsp;&nbsp;Patient Appointments\n                </a>\n            </li>\n            <li class=\"toolbar-item\">\n                <a routerLink=\"edit\" routerLinkActive=\"active\" *ngIf=\"isNewPatient\">\n                    <span class=\"glyphicon glyphicon-plus\"></span>&nbsp;&nbsp;New Patient\n                </a>\n                <a routerLink=\"edit\" routerLinkActive=\"active\" *ngIf=\"!isNewPatient\">\n                    <span class=\"glyphicon glyphicon-edit\"></span>&nbsp;&nbsp;Edit Patient\n                </a>\n            </li>\n        </ul>\n    </div>\n    <div class=\"container\">\n        <router-outlet></router-outlet>\n        <br />\n        <br />\n        <a routerLink=\"/patients\">Back to list</a>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/patient/patient.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PatientComponent = (function () {
    function PatientComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    PatientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            var id = params['id'];
            _this.isNewPatient = (id == 0);
        });
    };
    PatientComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'pm-patient',
            template: __webpack_require__("../../../../../src/app/patient/patient.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], PatientComponent);
    return PatientComponent;
}());



/***/ }),

/***/ "../../../../../src/app/patient/patient.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientModule", function() { return PatientModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__patient_routing_module__ = __webpack_require__("../../../../../src/app/patient/patient-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PatientModule = (function () {
    function PatientModule() {
    }
    PatientModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2__patient_routing_module__["a" /* PatientRoutingModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__patient_routing_module__["a" /* PatientRoutingModule */].components]
        })
    ], PatientModule);
    return PatientModule;
}());



/***/ })

});
//# sourceMappingURL=patient.module.chunk.js.map