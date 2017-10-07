import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClassService } from '../classes/class.service';
import { SchoolService } from '../schools/school.service';
import { FileService } from "../utils/files.service";
import { UserService } from "../users/user.service";

import { School } from "../schools/iSchool";
import { Class } from '../classes/iClass';
import { UserProfile } from '../users/iUsers';
declare var $: any;

@Component({
    selector: "class-form",
    templateUrl: "./class-form.component.html"
})

export class ClassFormComponent {

    schools: School[];
    class: Class;
    checkedPrimary: boolean;
    schoolID: School;
    students: UserProfile[];

    constructor(
        private _classService: ClassService,
        private _schoolService: SchoolService,
        private _fileService: FileService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private changeDetected: ChangeDetectorRef
    ) { this.class = new Class(); }

    public async ngOnInit() {
        this.students = [];
        let studentsToShow={};
        this.students = [];
        this.schools = await this._schoolService.getSchools();
        this.students = await this._classService.getStudentsWithoutClass();

        $.each(this.students, function(index,value){
            studentsToShow[value.Name]=null
        })

        $(document).ready(function () {
            $('.chips-autocomplete').material_chip({
                autocompleteOptions: {
                    data: studentsToShow,
                    limit: Infinity,
                    minLength: 1
                }
            })
        });
    }

    public async createClass() {
        var classID = await this._classService.createClass(this.class);
        let studs = $(".chips-autocomplete").material_chip('data');
        for(let stud of studs){
           let studentID = this.students.filter(student => student.Name == stud["tag"])[0].ID;
           let res = await this._classService.addUserToClass(classID, studentID);
           console.log(res)
        }
    }

}