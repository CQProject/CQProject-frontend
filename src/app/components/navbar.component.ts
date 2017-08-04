import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { IUser } from "../interfaces/user";

@Component({
    selector: 'navbar',
    templateUrl: "../public/navbar.component.html"
})

export class NavbarComponent {

    mail: String;
    pass: String;
    authorized: Boolean;
    user: IUser

    constructor(
        private _service: LoginService,
        private _router: Router,
        private _ngZone: NgZone,
    ) {
        this.authorized = false;
    }

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            //necessita de um método da API para verificar se o token ainda é válido
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            console.log(this.user)
            this.authorized = true;
            this.checkingNotifications();
        }
    }

    login() {
        console.log("entrou no login - component")
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
        console.log(JSON.parse(localStorage.getItem('currentUser')))
    }


    checkingNotifications() {
        console.log(`check`);
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


}