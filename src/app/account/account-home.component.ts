import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "./account.service";
import { ClassService } from "../classes/class.service";
import { Account } from "./iAccount";
import { AdminGuard, AssistantGuard, SecretaryGuard, StudentGuard, TeacherGuard, GuardianGuard } from "../utils/auth-guard.service";

@Component({
    template: ""
})

export class AccountHomeComponent {

    constructor(
        private _router: Router,
        public _teacherGuard: TeacherGuard,
        public _studentGuard: StudentGuard,
        public _guardianGuard: GuardianGuard,
        public _adminGuard: AdminGuard,
        public _assistantGuard: AssistantGuard,
        public _secretaryGuard: SecretaryGuard,
        private _classService: ClassService
    ) { }

    public async ngOnInit() {
        if (this._studentGuard.canActivate()) {
            let usID = JSON.parse(localStorage.getItem('currentUser')).userID;
            let classes = await this._classService.getClassesByUser(usID);
            this._router.navigate(['primary-class/', classes[classes.length - 1]])
        } else if (this._teacherGuard.canActivate()) {
            this._router.navigate(['user/details/', JSON.parse(localStorage.getItem('currentUser')).userID])
        } else if (this._guardianGuard.canActivate()) {
            this._router.navigate(['children/', JSON.parse(localStorage.getItem('currentUser')).userID])
        } else if (this._secretaryGuard.canActivate()) {
            this._router.navigate(['schools']);
        } else if (this._assistantGuard.canActivate()) {
            this._router.navigate(['schools']);
        } else if (this._adminGuard.canActivate()) {
            this._router.navigate(['schools']);
        } else {
            this._router.navigate(['homepage']);
        }

    }
}