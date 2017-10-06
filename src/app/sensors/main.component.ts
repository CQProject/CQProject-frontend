import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminGuard } from '../utils/auth-guard.service';
import { FloorService } from './floor.service';
import { SchoolService } from "../schools/school.service";

import { Floor } from "./iFloor";
import { School } from '../schools/iSchool';

@Component({ templateUrl: "./main.component.html" })

export class FloorMainComponent {

    school: School;
    floors:Floor[];
    private nCols: number;

    constructor(
        public _adminGuard : AdminGuard,
        private _schoolService: SchoolService,
        private _floorService: FloorService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    public async ngOnInit() {
        let schoolID;
        this._route.params.subscribe(params => schoolID = params['id']);
        this.school = await this._schoolService.getSchool(schoolID);
        this.floors = await this._floorService.getFloorsBySchool(schoolID);
        if((this.floors.length%2)== 0){
            this.nCols = 8/this.floors.length;
        }else{
            this.nCols = 6 / this.floors.length;
        }
        this._router.navigate(['/building/school/',schoolID,'floor',this.floors[0].ID]);
    }
}