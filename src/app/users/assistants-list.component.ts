import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';

import { UserService } from '../users/user.service';
import { FileService } from '../utils/files.service';
import { ClassService } from "../classes/class.service";
import { UserProfile } from './iUsers';
import { ParentingService } from './parenting.service';
declare var $: any;

@Component({
    selector: "assistant-list",
    templateUrl: "./assistants-list.component.html"
})

export class AssistantListComponent {

    public assistantsID: any[];
    public assistants: any[];

    constructor(
        private _classService: ClassService,
        private _userService: UserService,
        private _fileService: FileService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { this.assistantsID = []; this.assistants = []; }

    public async ngOnInit() {
        let userID = JSON.parse(localStorage.getItem('currentUser')).userID;
        let nPages = await this._userService.getUsersCount(4);
        for (var i = 0; i < nPages; i++) {
            this.assistantsID = this.assistantsID.concat(await this._userService.getUsersByPage(i, 4));
        }
        for (var i = 0; i < this.assistantsID.length; i++) {
            let teacher = await this._userService.getProfile(this.assistantsID[i])
            let photo = await this._fileService.imageDownloadAsync(teacher.Photo);
            this.assistants.push({
                Email:teacher.Email,
                Function:teacher.Function,
                ID:teacher.ID,
                Name:teacher.Name,
                Photo:photo
            });
        }
    }
}