import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "./account.service";
import { Account } from "./iAccount";

@Component({
    selector: 'navbar',
    templateUrl: "./account-navbar.component.html"
})

export class AccountNavbarComponent {

    mail: string;
    pass: string;
    authorized: boolean;
    user: Account;

    constructor(
        private _service: AccountService,
        private _router: Router,
        private _ngZone: NgZone,
    ) {
        this.authorized = false;
    }

    public async ngOnInit() {
        console.log("vai verificar se está algum utilizador");
        if (JSON.parse(localStorage.getItem('currentUser')) != null) {
            console.log(JSON.parse(localStorage.getItem('currentUser')));
            if (await this._service.verifyToken()) {
                console.log("token válido");
                this.user = JSON.parse(localStorage.getItem('currentUser'));
                this.authorized = true;
            } else {
                console.log("token inválido");
                this.mail = JSON.parse(localStorage.getItem('currentUser')).email;
                this.pass = JSON.parse(localStorage.getItem('currentUser')).password;
                this.login();
            }
        }else{console.log("não está autenticado");}
    }

    public login() {
        if (this.mail != null && this.pass != null) {
            this._service.login(this.mail, this.pass)
                .subscribe(
                data => {
                    this.user = data;
                    console.log(data);
                    localStorage.setItem('currentUser', JSON.stringify(this.user));
                    this.authorized = true;
                    this._router.navigate(['home']);
                },
                error => {
                    console.log("Impossível entrar no sistema");
                });
        }
    }

    public logout() {
        this.user = null;
        localStorage.removeItem('currentUser');
        this.authorized = false;
        this._router.navigate(['schools']);
    }

    public dropdown(elementID: string) {
        var element = document.getElementById(elementID);
        if (element.className.indexOf("w3-show") == -1) {
            element.className += " w3-show";
        } else {
            element.className = element.className.replace(" w3-show", "");
        }
    }


}