import { AdminGuard, SecretaryGuard } from '../utils/auth-guard.service';
import 'materialize-css';
import { toast } from 'materialize-css';
import { concat } from 'rxjs/operator/concat';
import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "./account.service";
import { Account } from "./iAccount";
import { UserProfile } from "../users/iUsers";
declare var $: any;

@Component({
    selector: 'navbar',
    templateUrl: "./account-navbar.component.html"
})

export class AccountNavbarComponent {

    mail: string;
    pass: string;
    authorized: boolean;
    user: Account;
    profile: UserProfile;

    constructor(
        private _service: AccountService,
        private _router: Router,
        private _ngZone: NgZone,
        private _changeDetect: ChangeDetectorRef,
        public _secretaryGuard: SecretaryGuard,
        public _adminGuard: AdminGuard
    ) {
        this.authorized = false;
    }

    public async ngOnInit() {
        $(document).ready(function(){
            $('.button-collapse').sideNav()
        });

        if (JSON.parse(localStorage.getItem('currentUser')) != null) {
            if (await this._service.verifyToken()) {
                this.user = JSON.parse(localStorage.getItem('currentUser'));
                this.authorized = true;
            } else {
                this.mail = JSON.parse(localStorage.getItem('currentUser')).email;
                this.pass = JSON.parse(localStorage.getItem('currentUser')).password;
                this.login();
            }
        }
    }

    public login() {
        if (this.mail != null && this.pass != null) {
            this._service.login(this.mail, this.pass)
                .subscribe(
                data => {
                    this.user = data;
                    if (data != null) {
                        localStorage.setItem('currentUser', JSON.stringify(this.user));
                        this.authorized = true;
                        this._router.navigate(['home']);
                        toast('Bem Vindo', 4000,'lime')
                    } else {
                        
                    }
                },
                error => {
                    
                });
        }
    }

    public logout() {
        this.user = null;
        localStorage.removeItem('currentUser');
        this.authorized = false;
        toast('Saída efetuada com sucesso', 4000,'lime')
        location.reload();
    }

    public closeNavMobile(){
        $(document).ready(function(){
            $('.button-collapse').sideNav('hide')
        });
    }
}