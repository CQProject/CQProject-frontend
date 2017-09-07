import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from "../../schools/school.service";
import { AssistantGuard } from "../../utils/auth-guard.service";
import { ClassService } from "../class.service";
import { School } from '../../schools/iSchool';
import { Class } from '../iClass';

@Component({ templateUrl: "./list.component.html" })

export class ClassKindergartenListComponent {

    public school: School;
    public classes: Class[];

    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _route: ActivatedRoute,
    ) { }

    public async ngOnInit() {
        let schoolID;
        this._route.parent.params.subscribe(params => schoolID = params['id']);
        this.school = await this._schoolService.getSchool(schoolID);
        this._classService
            .getClassesByKindergarten(schoolID)
            .subscribe(data => this.classes = data);
    }
}