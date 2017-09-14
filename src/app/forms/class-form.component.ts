import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClassService } from '../classes/class.service';
import { SchoolService } from '../schools/school.service';
import { FileService } from "../utils/files.service";

import { School } from "../schools/iSchool";
import { Class } from '../classes/iClass';

@Component({
    selector: "class-form",
    templateUrl: "./class-form.component.html"
})

export class ClassFormComponent {

    schools: School[];
    class: Class;
    checked:boolean;

    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _fileService: FileService,
        private _route: ActivatedRoute
    ) { this.class = new Class(); }

    public async ngOnInit() {
        this.schools = await this._schoolService.getSchools();
    }

    
    public show(elementID: string) {
        document.getElementById(elementID).style.display = 'block';
    }

    public hide(elementID: string) {
        document.getElementById(elementID).style.display = 'none';
    }

    public async createFloor() {
        var result = await this._classService.createClass(this.class);
        if(result) location.reload();
    }
}