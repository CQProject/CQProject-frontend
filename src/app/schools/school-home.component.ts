import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from './school.service';
import { School } from "./iSchool";

@Component({ templateUrl: "./school-home.component.html" })

export class SchoolHomeComponent {

    public schools: School[];

    constructor(
        private _service: SchoolService,
        private _route: Router
    ) { }

    public ngOnInit() {
        this._service.getSchools()
            .subscribe(
            schools => {
                this.schools = schools;
                for (let school of this.schools) {
                    school.Logo = "../../assets/img/" + school.Logo;
                    school.ProfilePicture = "../../assets/img/" + school.ProfilePicture;
                }
                console.log(schools);
            },
            error => console.log("Impossível carregar lista de escolas"));
    }

    public show(elementID: string) {
        document.getElementById(elementID).style.display='block';
    }

    public hide(elementID: string) {
        document.getElementById(elementID).style.display='none';
    }
}
