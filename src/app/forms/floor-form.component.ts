import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FloorService } from '../sensors/floor.service';
import { SchoolService } from '../schools/school.service';
import { FileService } from "../utils/files.service";

import { School } from "../schools/iSchool";
import { Floor } from "../sensors/iFloor";

@Component({
    selector: "floor-form",
    templateUrl: "./floor-form.component.html"
})

export class FloorFormComponent {

    floor: Floor;
    image: File;

    constructor(
        private _floorService: FloorService,
        private _schoolService: SchoolService,
        private _fileService: FileService,
        private _route: ActivatedRoute,
        private _changeDetetor:ChangeDetectorRef
    ) { this.floor = new Floor(); }

    public async ngOnInit() {
        this._route.parent.params.subscribe(params => this.floor.SchoolFK = params['id']);
    }

    public getImage(event) {
        this.image = event.target.files[0];
    }

    public async createFloor() {
        this.floor.Image = await this._fileService.imageUpload(this.image);
        var result = await this._floorService.createFloor(this.floor);
        this.floor = new Floor();
        this._changeDetetor.detectChanges();
    }
}