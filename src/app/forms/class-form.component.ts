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
    studentsID: number[];
    class: Class;
    checkedPrimary: boolean;
    schoolID: School;
    students: UserProfile[];
    studentsToShow: UserProfile[];

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
        this.getStudents();
    }


    public show(elementID: string) {
        document.getElementById(elementID).style.display = 'block';
    }

    public hide(elementID: string) {
        document.getElementById(elementID).style.display = 'none';
    }

    public async getStudents() {
        let numStuds = await this._userService.getUsersCount(1);
        this.studentsID = [];
        this.students = [];
        this.studentsToShow = [];
        for (var i = 0; i < numStuds; i++) {
            this.studentsID = this.studentsID.concat(await this._userService.getUsersByPage(i, 1));
        }
        for (let stud of this.studentsID) {
            let student = await this._userService.getProfile(stud);
            this.students.push(student);
        }
        this.studentsToShow = this.studentsToShow.concat(this.students);
        console.log(this.studentsFilter("student-1"))
    }


    public studentsFilter(event: any): UserProfile[] {
        let filterBy = event.target.value;
        filterBy = filterBy ? filterBy.toLowerCase() : null;
        this.changeDetected.detectChanges();
        return filterBy ? this.studentsToShow.filter((student: UserProfile) =>
            student.Name.toLocaleLowerCase().indexOf(filterBy) !== -1) : this.studentsToShow;
    }

    public async createClass() {
        var result = await this._classService.createClass(this.class);
        if (result) location.reload();
    }
}