import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';

import { UserService } from '../users/user.service';
import { FileService } from '../utils/files.service';
import { ClassService } from "../classes/class.service";
import { UserProfile } from './iUsers';
import { ParentingService } from './parenting.service';
declare var $: any;

@Component({
    selector: "teacher-list",
    templateUrl: "./teacher-list.component.html"
})

export class TeacherListComponent {

    public teachersID: any[];
    public teachers: any[];

    constructor(
        private _classService: ClassService,
        private _userService: UserService,
        private _fileService: FileService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { this.teachersID = []; this.teachers = []; }

    public async ngOnInit() {
        let userID = JSON.parse(localStorage.getItem('currentUser')).userID;
        let nPages = await this._userService.getUsersCount(2);
        for (var i = 0; i < nPages; i++) {
            this.teachersID = this.teachersID.concat(await this._userService.getUsersByPage(i, 2));
        }
        for (var i = 0; i < this.teachersID.length; i++) {
            let teacher = await this._userService.getProfile(this.teachersID[i])
            console.log(teacher);
            let photo = await this._fileService.imageDownloadAsync(teacher.Photo);
            this.teachers.push({
                Email:teacher.Email,
                Function:teacher.Function,
                ID:teacher.ID,
                Name:teacher.Name,
                Photo:photo
            });
        }
    }
}