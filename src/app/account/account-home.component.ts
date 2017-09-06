import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "./account.service";
import { SchoolService } from "../schools/school.service";
import { ClassService } from "../classes/class.service";
import { Account } from "./iAccount";
import { StudentGuard, TeacherGuard, GuardianGuard, AssistantGuard, SecretaryGuard } from '../utils/auth-guard.service';
import { School } from "../schools/iSchool";
import { Class } from "../classes/iClass";

@Component({
    templateUrl: "./account-home.component.html"
})

export class AccountHomeComponent {

    public school: School;
    public class: Class;

    constructor(
        private _service: AccountService,
        private _classService:ClassService,
        private _schoolService: SchoolService,
        private _router: Router,
        private _ngZone: NgZone,
        private _assistantGuard: AssistantGuard,
        private _studentGuard: StudentGuard,
        private _teacherGuard: TeacherGuard,
        private _guardianGuard: GuardianGuard,
        private _secretaryGuard: SecretaryGuard
    ) { }

    public async ngOnInit(){
        let c = JSON.parse(localStorage.getItem('currentUser')).class;
        TENTAR ARRANJAR ID
        this.class = await this._classService.getClassProfile(c);
        this.school = await this._schoolService.getSchool(this.class.SchoolFK);
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