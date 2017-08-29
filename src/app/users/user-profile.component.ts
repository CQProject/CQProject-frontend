import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../users/user.service";
import { UserProfile } from "../users/iUsers";

@Component({
    templateUrl: "./user-profile.component.html"
})

export class UserProfileComponent {

    user: UserProfile;
    id: Number;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UserService
    ) {
    }

    public ngOnInit(){
        this._route.params.subscribe( params => {
            this.id = +params['id'];//+ converte string 'id' para numero
        });
        this.getProfile(this.id);
    }

    public async getProfile(id: Number){
        this.user = await this._userService.getProfile(id);
    }
}