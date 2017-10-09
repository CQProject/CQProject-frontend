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
    selector: "userclass-form",
    templateUrl: "./user-class-form.component.html"
})

export class UserClassFormComponent {

    checkedPrimary: boolean;
    schoolID: School;
    students: UserProfile[];

    constructor(
        private _classService: ClassService,
        private _route: ActivatedRoute
    ) {  }

    public async ngOnInit() {
        let studentsToShow={};
        this.students = [];
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

    public async addStudents() {
        let studs = $(".chips-autocomplete").material_chip('data');
        let classID
        this._route.parent.params.subscribe(params => classID = params['id']);
        for(let stud of studs){
           let studentID = this.students.filter(student => student.Name == stud["tag"])[0].ID;
           let res = await this._classService.addUserToClass(classID, studentID);
           console.log(res)
        }
    }

}