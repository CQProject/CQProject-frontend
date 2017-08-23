import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "./account.service";
import { Account } from "./iAccount";

@Component({
    templateUrl: "./account-home.component.html"
})

export class AccountHomeComponent {

    constructor(
        private _service: AccountService,
        private _router: Router,
        private _ngZone: NgZone,
    ) { }


}