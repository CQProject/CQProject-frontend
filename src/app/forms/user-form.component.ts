import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from "../users/user.service";
import { FileService } from "../utils/files.service";
import { AdminGuard } from "../utils/auth-guard.service";

import { UserDetailsToPost } from '../users/iUsers';

@Component({
    selector: "user-form",
    templateUrl: "./user-form.component.html"
})

export class UserFormComponent {

    checked: boolean;
    user: UserDetailsToPost;
    confirmed: boolean;
    photo: any;
    curriculum: any;

    constructor(
        public _userService: UserService,
        public _fileService: FileService,
        public _adminGuard: AdminGuard,
        public _changeDetetor: ChangeDetectorRef
    ) {
        this.checked = false;
        this.confirmed = false;
        this.user = new UserDetailsToPost();
    }

    
    public confirmPassword(event:any){
        var confPass = event.target.value;
        if(this.user.Password!=null && confPass!=null){
            if(this.user.Password==confPass){
                this.confirmed = true;
            }else{
                return this.confirmed = false;
            }
        }else{
            return this.confirmed = false;
        }
    }

    public getProfileImage(event) {
        this.photo = event.target.files[0];
        console.log(this.curriculum)
    }

    public getCurriculum(event){
        this.curriculum = event.target.files[0];
    }

    public async createUser(){
        this.user.Photo = await this._fileService.imageUpload(this.photo);
        this.user.Curriculum = await this._fileService.fileUpload(this.curriculum);
        let result = await this._userService.createUser(this.user);
        this.user = new UserDetailsToPost();
        this._changeDetetor.detectChanges();
    }
}