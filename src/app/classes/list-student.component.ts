import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { SchoolService } from "../schools/school.service";
import { AssistantGuard } from "../utils/auth-guard.service";
import { ClassService } from "../classes/class.service";
import { School } from '../schools/iSchool';
import { Class } from '../classes/iClass';
declare var $: any;


@Component({ selector: 'class-list-student', templateUrl: "./list-student.component.html" })

export class ClassListStudentComponent {

    public classes: any[];
    public hasClass: boolean;

    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { this.classes = []; }

    public async ngOnInit() {
        $(document).ready(function () {
            $('ul.tabs').tabs({
                swipeable: true
            });
        });
        let userID;
        this._route.params.subscribe(params => userID = params['id']);
        let classs = await this._classService.getClassesByUser(userID);
        this.hasClass = classs.length > 0 ? true : false;
        for (let cla of classs) {
            let clas = await this._classService.getClassProfile(cla);
            let school = await this._schoolService.getSchool(clas.SchoolFK);
            this.classes.push({
                Class: clas.Year + clas.ClassDesc,
                ID: clas.ID,
                School: school.Name
            })
        }

        this.classes = this.classes.sort((a, b) => {
            if (a.School > b.School) return 1;
            if (a.School < b.School) return -1;
            return 0;
        });
    }
}