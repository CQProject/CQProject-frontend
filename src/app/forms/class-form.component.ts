import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClassService } from '../classes/class.service';
import { SchoolService } from '../schools/school.service';
import { FileService } from "../utils/files.service";
import { UserService } from "../users/user.service";

import { School } from "../schools/iSchool";
import { Class } from '../classes/iClass';
import { UserProfile } from '../users/iUsers';

@Component({
    selector: "class-form",
    templateUrl: "./class-form.component.html"
})

export class ClassFormComponent {

    school: School;
    class: Class;
    checkedPrimary: boolean;

    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _route: ActivatedRoute, 
        private changeDetected: ChangeDetectorRef
    ) { this.class = new Class(); }

    public async ngOnInit() {
        let schoolID
        this._route.params.subscribe(params => schoolID = params['id']);
        this.class.SchoolFK=schoolID;
        this.school = await this._schoolService.getSchool(schoolID);
    }

    public async createClass() {
        var result = await this._classService.createClass(this.class);
        this.class = new Class();
        this.changeDetected.detectChanges();
    }
}