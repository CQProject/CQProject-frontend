import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';

import { UserService } from '../users/user.service';
import { FileService } from '../utils/files.service';
import { ClassService } from "../classes/class.service";
import { UserProfile } from './iUsers';
import { ParentingService } from './parenting.service';
declare var $: any;

@Component({
    selector: "children-list",
    templateUrl: "./children-list.component.html"
})

export class ChildrenListComponent {

    public students: any[];

    constructor(
        private _classService: ClassService,
        private _userService: UserService,
        private _fileService: FileService,
        private _parentingService: ParentingService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { this.students = []; }

    public async ngOnInit() {
        let guardianID;
        this._route.params.subscribe(params => guardianID = +params["id"]);

        let studentIDs = await this._parentingService.getChildrenByUser(guardianID);
        for (var i = 0; i < studentIDs.length; i++) {
            let student = await this._userService.getProfile(studentIDs[i]);
            let clas = await this._classService.getClassesByUser(studentIDs[i]);
            this._fileService.imageDownload(student.Photo)
                .subscribe((res) => {
                    this.students.push({
                        "Name": student.Name,
                        "ClassID": clas[clas.length - 1],
                        "UserID": student.ID,
                        "Photo": res
                    });
                });
        }
        this.students.sort(function (a, b) {
            return (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0);
        });
    }
}