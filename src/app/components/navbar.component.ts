import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../services/account.service";
import { IUser } from "../interfaces/user";

@Component({
    selector: 'navbar',
    templateUrl: "../public/navbar.component.html"
})

export class NavbarComponent {

    mail: string;
    pass: string;
    authorized: boolean;
    user: IUser

    constructor(
        private _service: AccountService,
        private _router: Router,
        private _ngZone: NgZone,
    ) {
        this.authorized = false;
    }

    async ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            if (await this._service.verifyToken()) {
                this.user = JSON.parse(localStorage.getItem('currentUser'));
                this.authorized = true;
                this.checkingNotifications();
            } else {
                this.mail = JSON.parse(localStorage.getItem('currentUser')).email;
                this.pass = JSON.parse(localStorage.getItem('currentUser')).password;
                this.login();
            }

        }
    }

    login() {
        if (this.mail != null && this.pass != null) {
            this._service.login(this.mail, this.pass)
                .subscribe(
                result => {
                    this.user = result;
                    localStorage.setItem('currentUser', JSON.stringify(this.user));
                    this.authorized = true;
                    this.checkingNotifications();
                },
                error => {
                    console.log("Impossível entrar no sistema");
                });
        }
    }

    logout() {
        this.user = null;
        localStorage.removeItem('currentUser');
        this.authorized = false;
    }


    checkingNotifications() {
        this._ngZone.runOutsideAngular(() => {
            this._check(() => {
                // reenter the Angular zone and display done
                this._ngZone.run(() => { console.log('finish') });
            })
        });
    }

    _check(doneCallback: () => void) {
        if (this.authorized) {
            console.log(`check`);
            window.setTimeout(() => this._check(doneCallback), 10000);
        } else {
            doneCallback();
        }
    }

    dropdown(elementID: string) {
        var element = document.getElementById(elementID);
        if (element.className.indexOf("w3-show") == -1) {
            element.className += " w3-show";
        } else {
            element.className = element.className.replace(" w3-show", "");
        }
    }


}