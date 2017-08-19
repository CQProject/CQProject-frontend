import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from './school.service';
import { ISchool } from "./school";

@Component({ templateUrl: "./school-home.component.html" })

export class SchoolHomeComponent{

    public schools: ISchool[];

    constructor(
        private _service: SchoolService,
        private _route: Router
    ) { }

    ngOnInit() {
        this._service.getSchools()
            .subscribe(
                schools => {this.schools = schools; console.log(schools);},
                error => console.log("Impossível carregar lista de escolas"));
        
    }
}
