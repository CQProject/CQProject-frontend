import { Component, OnInit } from '@angular/core';
import { AdminGuard } from "../utils/auth-guard.service";

@Component({
    selector: "main-form",
    templateUrl: "./main.component.html"
})

export class MainFormComponent {

    constructor(
        private _adminGuard: AdminGuard
    ) { }

    public ngOnInit() {
        
    }
}