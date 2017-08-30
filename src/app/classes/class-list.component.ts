import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { SchoolService } from "../schools/school.service";
import { AssistantGuard } from "../utils/auth-guard.service";
import { ClassService } from "./class.service";
import { School } from '../schools/iSchool';
import { Class } from './iClass';

@Component({ templateUrl: "./class-list.component.html" })

export class ClassListComponent {

    public school: School;
    public classes: Class[];

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
            .getClassesBySchool(schoolID)
            .subscribe(data => {
                this.classes = data;
                console.log(this.classes);
            });
    }



    public show() {
        document.getElementById("info").style.display = 'block';
    }

    public hide() {
        document.getElementById("info").style.display = 'none';
    }

    public accordion() {
        var x = document.getElementById("accordion");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }
}