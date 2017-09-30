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

    schools: School[];
    class: Class;
    checkedPrimary: boolean;
    schoolID: School;

    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _fileService: FileService,
        private _userService: UserService,
        private _route: ActivatedRoute, 
        private changeDetected: ChangeDetectorRef
    ) { this.class = new Class(); }

    public async ngOnInit() {
        this.schools = await this._schoolService.getSchools();
    }

    public async createClass() {
        var result = await this._classService.createClass(this.class);
        if (result) location.reload();
    }
}