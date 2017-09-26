import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "./account.service";
import { ClassService } from "../classes/class.service";
import { Account } from "./iAccount";
import { AdminGuard, AssistantGuard, SecretaryGuard, StudentGuard, TeacherGuard } from "../utils/auth-guard.service";

@Component({
    templateUrl: "./account-home.component.html"
})

export class AccountHomeComponent {

    private userRole: number[];

    constructor(
        private _service: AccountService,
        private _router: Router,
        private _ngZone: NgZone,
        private _teacherGuard: TeacherGuard,
        private _studentGuard: StudentGuard,
        private _classService: ClassService
    ) { }

    public async ngOnInit(){
        let usID;
        let classID;
        usID = JSON.parse(localStorage.getItem('currentUser')).userID;
        let classes = await this._classService.getClassesByUser(usID);
        classID = parseInt(classes[classes.length - 1]);

        if(this._studentGuard.canActivate()){
            this._router.navigate(['primary-class/', classID])
        }
    }

    public chooseOption(id: string) {
        var information, tablink;
        information = document.getElementsByClassName("information");
        for (var i = 0; i < information.length; i++) {
            if (information[i].id == id) {
                information[i].className = information[i].className.replace(" w3-hide", " w3-show");
            } else {
                information[i].className = information[i].className.replace(" w3-show", " w3-hide");
            }
        }
        tablink = document.getElementsByClassName("tablink");
        for (var i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace("w3-border-green", " ");
            if (id.includes(tablink[i].id)) {
                tablink[i].className += " w3-border-green";
            }
        }
    }


}