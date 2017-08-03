import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { ISchool } from "../interfaces/school";

@Component({
  templateUrl: "../public/home.component.html"
})

export class HomeComponent{

    public schools: ISchool[];

    constructor(
        private _service: HomeService,
        private _route: Router
    ) { }

    ngOnInit() {
        this._service.getSchools()
            .subscribe(
                schools => {this.schools = schools; console.log(schools);},
                error => console.log("Impossível carregar lista de escolas"));
        
    }
}
