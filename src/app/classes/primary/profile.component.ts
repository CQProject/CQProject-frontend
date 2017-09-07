import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AssistantGuard, TeacherGuard } from '../../utils/auth-guard.service';
import { SchoolService } from "../../schools/school.service";
import { ClassService } from "../class.service";

import { School } from '../../schools/iSchool';
import { Class } from '../iClass';

@Component({ templateUrl: "./profile.component.html" })

export class ClassPrimaryProfileComponent {

    public school: School;
    public class: Class;


    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _route: ActivatedRoute,
    ) { }

    public async ngOnInit() {
        let classID;
        this._route.params.subscribe(params => classID = params['id']);
        this.class = await this._classService.getClassProfile(classID);
        this.school = await this._schoolService.getSchool(this.class.SchoolFK);
    }

    public chooseOption(id: string) {
        var tablink = document.getElementsByClassName("tablink");
        for (var i = 0; i < tablink.length; i++)
            tablink[i].className = tablink[i].className.replace("w3-border-green", " ");
        var element = document.getElementById(id);
        element.className+=" w3-border-green";
    }
}