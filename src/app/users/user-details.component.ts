import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../account/account.service";
import { AdminGuard, AssistantGuard, GuardianGuard, SecretaryGuard, StudentGuard, TeacherGuard } from "../utils/auth-guard.service"
import { Account } from "../account/iAccount";
import { UserService } from "../users/user.service";
import { UserDetails, UserDetailsToPost } from "../users/iUsers";
import { FileService } from "../utils/files.service";

@Component({
    selector: 'user-details',
    templateUrl: "./user-details.component.html"
})

export class UserDetailsComponent {

    public profileDetails: UserDetails;
    private profilePhoto: File;

    constructor(
        private _service: AccountService,
        private _userService: UserService,
        private _fileService: FileService,
        private _router: Router,
        private _route: ActivatedRoute,
        public _adminGuard: AdminGuard,
        public _assistantGuard: AssistantGuard,
        public _guardianGuard: GuardianGuard,
        public _secretaryGuard: SecretaryGuard,
        public _studentGuard: StudentGuard,
        public _teacherGuard: TeacherGuard
    ) { }

    public async ngOnInit() {
        let userID;
        this._route.params.subscribe(params => userID = +params["id"]);
        this.profileDetails = await this._userService.getUserDetails(userID);
        if (this.profileDetails.Photo != null) {
            await this._fileService.imageDownload(this.profileDetails.Photo)
                .subscribe((res) => { this.profilePhoto = res; });
        }
    }
}