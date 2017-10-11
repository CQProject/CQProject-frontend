import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';

import { UserService } from '../users/user.service';
import { FileService } from '../utils/files.service';
import { ClassService } from "../classes/class.service";
import { UserProfile } from './iUsers';
import { ParentingService } from './parenting.service';
declare var $: any;

@Component({
    selector: "secretary-list",
    templateUrl: "./secretary-list.component.html"
})

export class SecretaryListComponent {

    public secretariesID: any[];
    public secretary: any[];

    constructor(
        private _classService: ClassService,
        private _userService: UserService,
        private _fileService: FileService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { this.secretariesID = []; this.secretary = []; }

    public async ngOnInit() {
        let userID = JSON.parse(localStorage.getItem('currentUser')).userID;
        let nPages = await this._userService.getUsersCount(3);
        for (var i = 0; i < nPages; i++) {
            this.secretariesID = this.secretariesID.concat(await this._userService.getUsersByPage(i, 3));
        }
        for (var i = 0; i < this.secretariesID.length; i++) {
            let teacher = await this._userService.getProfile(this.secretariesID[i])
            let photo = await this._fileService.imageDownloadAsync(teacher.Photo);
            this.secretary.push({
                Email:teacher.Email,
                Function:teacher.Function,
                ID:teacher.ID,
                Name:teacher.Name,
                Photo:photo
            });
        }
    }
}