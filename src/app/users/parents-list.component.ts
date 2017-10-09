import { AdminGuard, SecretaryGuard } from '../utils/auth-guard.service';
import { error } from 'util';
import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';

import { UserService } from '../users/user.service';
import { FileService } from '../utils/files.service';
import { ClassService } from "../classes/class.service";
import { UserProfile } from './iUsers';
import { ParentingService } from './parenting.service';
declare var $: any;

@Component({
    selector: "parent-list",
    templateUrl: "./parents-list.component.html"
})

export class ParentListComponent {

    public parents: any[];
    public hasGuardian: boolean;
    public studentID

    constructor(
        private _classService: ClassService,
        private _userService: UserService,
        private _fileService: FileService,
        private _parentingService: ParentingService,
        private _router: Router,
        private _route: ActivatedRoute,
        public _adminGuard: AdminGuard,
        public _secretaryGuard: SecretaryGuard
    ) { this.parents = []; }

    public async ngOnInit() {
        this._route.params.subscribe(params => this.studentID = +params["id"]);

        let guardiansID = await this._parentingService.getGuardiansByUser(this.studentID);
        this.hasGuardian = (guardiansID != null) ? true : false;
        if (this.hasGuardian) {
            for (var i = 0; i < guardiansID.length; i++) {
                let guardian = await this._userService.getProfile(guardiansID[i]);
                this._fileService.imageDownload(guardian.Photo)
                    .subscribe((res) => {
                        this.parents.push({
                            "Name": guardian.Name,
                            "ID": guardian.ID,
                            "Email": guardian.Email,
                            "Photo": res
                        });
                    },
                    (error) => {
                        this.parents.push({
                            "Name": guardian.Name,
                            "ID": guardian.ID,
                            "Email": guardian.Email
                        });
                    }
                    );
            }
            this.parents.sort(function (a, b) {
                return (a.ID > b.ID) ? 1 : ((b.ID > a.ID) ? -1 : 0);
            });
        }

    }
}