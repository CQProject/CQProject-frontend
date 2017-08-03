import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

@Component({
    selector: 'navbar',
    templateUrl: "../public/navbar.component.html"
})

export class NavbarComponent {

    mail: String;
    pass: String;
    authorized: Boolean;

    constructor(
        private _service: LoginService,
        private _route: Router
    ) { 
        this.authorized=false;
    }

    ngOnInit() { }

    login() {
        console.log("entrou no login - component")
        if (this.mail != null && this.pass != null) {
            this._service.login(this.mail, this.pass)
                .subscribe(
                result => {
                    localStorage.setItem('currentUser', JSON.stringify(result));
                    console.log(JSON.parse(localStorage.getItem('currentUser')));
                    this.authorized = true;
                },
                error => {
                    console.log("Impossível entrar no sistema");
                })
        }
    }



}