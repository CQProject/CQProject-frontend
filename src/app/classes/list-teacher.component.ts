import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { SchoolService } from "../schools/school.service";
import { AssistantGuard } from "../utils/auth-guard.service";
import { ClassService } from "../classes/class.service";
import { School } from '../schools/iSchool';
import { Class } from '../classes/iClass';
declare var $: any;


@Component({ selector: 'class-list-teacher', templateUrl: "./list-teacher.component.html" })

export class ClassListTeacherComponent {

    public classes: any[];

    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { this.classes=[]; }

    public async ngOnInit() {
        $(document).ready(function(){
            $('ul.tabs').tabs({
                swipeable:true
            });
          });
        let teacherID;
        this._route.params.subscribe(params => teacherID = params['id']);
        let classs = await this._classService.getClassesByTeacher(teacherID);
        for(let cla of classs){
            let clas = await this._classService.getClassProfile(cla);
            let school = await this._schoolService.getSchool(clas.SchoolFK);
            this.classes.push({
                Class: clas.Year+clas.ClassDesc,
                ID:clas.ID,
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