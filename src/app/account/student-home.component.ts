import { concat } from 'rxjs/operator/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../account/account.service";
import { Account } from "../account/iAccount";
import { UserProfile } from "../users/iUsers";
import { UserService } from "../users/user.service";
import { FileService } from "../utils/files.service";
import { ClassService } from "../classes/class.service";

@Component({
    selector: 'student-home',
    templateUrl: "./student-home.component.html"
})

export class StudentHomeComponent {

    private profileUser: UserProfile;
    private profilePhoto: File;
    private classUser: number;

    constructor(
        private _service: AccountService,
        private _userService: UserService,
        private _fileService: FileService,
        private _classService: ClassService,
        private _router: Router
    ) {
    }

    public async ngOnInit(){
        let userID = JSON.parse(localStorage.getItem('currentUser')).userID;
        this.profileUser = await this._userService.getProfile(userID);
        await this._fileService.imageDownload(this.profileUser.Photo)
        .subscribe((res) => { this.profilePhoto = res; });
    }

    public async showNotif(){
        this._router.navigate(['notifications']);
    }

    public async showProfile(){
        this._router.navigate(['/user/details/', this.profileUser.ID]);
    }
}