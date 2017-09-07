import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';

import { UserService } from '../../users/user.service';
import { FileService } from '../../utils/files.service';
import { ClassService } from "../class.service";
import { UserProfile } from '../../users/iUsers';

@Component({ 
    selector: "primary-students",
    templateUrl: "./students.component.html" 
})

export class ClassPrimaryStudentsComponent {

    public students: UserProfile[];


    constructor(
        private _classService: ClassService,
        private _userService: UserService,
        private _fileService: FileService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { this.students = []; }

    public async ngOnInit() {
        let classID;
        this._route.parent.params.subscribe(params =>classID = +params["id"]);

        let studentIDs = await this._classService.getStudentsByClass(classID);
        for (var i = 0; i < studentIDs.length; i++) {
            this.students[i] = await this._userService.getProfile(studentIDs[i]);
        }
        
        for (let student of this.students) {
            this._fileService.imageDownload(student.Photo)
                .subscribe((res) => {
                    student.Photo = res;
                });
        }
        this.students.sort(function(a,b) {
            return (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0);
        }); 
    }
}