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

    public chooseOption(id: string) {
        var information, tablink;
        information = document.getElementsByClassName("information");
        for (var i = 0; i < information.length; i++) {
            if (information[i].id == id) {
                information[i].className = information[i].className.replace(" w3-hide", " w3-show");
            } else {
                information[i].className = information[i].className.replace(" w3-show", " w3-hide");
            }
        }
        tablink = document.getElementsByClassName("tablink");
        for (var i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace("w3-border-green", " ");
            if (id.includes(tablink[i].id)) {
                tablink[i].className += " w3-border-green";
            }
        }
    }


}