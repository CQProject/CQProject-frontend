import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from "../users/user.service";
import { AdminGuard } from "../utils/auth-guard.service";

import { UserDetailsToPost } from '../users/iUsers';

@Component({
    selector: "user-form",
    templateUrl: "./user-form.component.html"
})

export class UserFormComponent {

    roleID: number;
    checked: boolean;
    user: UserDetailsToPost;
    confirmed: boolean;

    constructor(
        private _userService: UserService,
        public _adminGuard: AdminGuard
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

    public createUser(){
        console.log(this.user)
    }
}