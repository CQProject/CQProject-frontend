import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { SchoolService } from "../schools/school.service";
import { AssistantGuard } from "../utils/auth-guard.service";
import { ClassService } from "./class.service";
import { School } from '../schools/iSchool';
import { Class } from './iClass';

@Component({ templateUrl: "./list.component.html" })

export class ClassListComponent {

    public school: School;
    public primaryClasses: Class[];
    public kindergartenClasses: Class[];

    constructor(
        private _service: ClassService,
        private _schoolService: SchoolService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    public async ngOnInit() {
        let schoolID;
        this._route.params.subscribe(params => schoolID = params['id']);
        this.school = await this._schoolService.getSchool(schoolID);
        this._service
            .getClassesByPrimarySchool(schoolID)
            .subscribe(data => {
                this.primaryClasses = data;
                console.log(this.primaryClasses);
            });
        this._service
            .getClassesByKindergarten(schoolID)
            .subscribe(data => {
                this.kindergartenClasses = data;
                console.log(this.primaryClasses);
            });
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