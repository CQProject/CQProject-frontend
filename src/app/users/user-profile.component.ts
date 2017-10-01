import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../users/user.service";
import { UserDetails } from "../users/iUsers";

@Component({
    templateUrl: "./user-profile.component.html"
})

export class UserProfileComponent {

    public user: UserDetails;
    id: number;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UserService
    ) {
    }

    public async ngOnInit() {
        this._route.params.subscribe(params => this.id = +params['id']);
        this.user = await this._userService.getUserDetails(this.id);
    }
}