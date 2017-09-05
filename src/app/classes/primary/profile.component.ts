import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { SchoolService } from "../../schools/school.service";
import { AssistantGuard, TeacherGuard } from '../../utils/auth-guard.service';

import { ClassService } from "../class.service";

import { School } from '../../schools/iSchool';
import { Class } from '../iClass';
import { UserProfile} from '../../users/iUsers';

@Component({ templateUrl: "./profile.component.html" })

export class ClassPrimaryProfileComponent {

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