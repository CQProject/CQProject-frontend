import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { SchoolService } from "../schools/school.service";
import { AssistantGuard, TeacherGuard } from '../utils/auth-guard.service';

import { ClassService } from "./class.service";

import { School } from '../schools/iSchool';
import { Class } from './iClass';
import { UserProfile} from '../users/iUsers';

@Component({ templateUrl: "./class-profile.component.html" })

export class ClassProfileComponent {

    public school: School;
    public class: Class;
    public students: UserProfile[];
    public teachers: UserProfile[];


    constructor(
        private _service: ClassService,
        private _schoolService: SchoolService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    public async ngOnInit() {
        let classID;
        this._route.params.subscribe(params => classID = params['id']);
        this.class = await this._service.getClassProfile(classID);
        this.school = await this._schoolService.getSchool(this.class.SchoolFK);
        
        console.log(this.class);
        console.log(this.school);
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