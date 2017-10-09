import { Component, OnInit } from '@angular/core';
import { AdminGuard, SecretaryGuard } from "../utils/auth-guard.service";

@Component({
    selector: "main-form",
    templateUrl: "./main.component.html"
})

export class MainFormComponent {

    constructor(
        public _adminGuard: AdminGuard,
        public _secretaryGuard: SecretaryGuard
    ) { }

    public ngOnInit() {
        
    }
}