import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FloorService } from './floor.service';
import { FileService } from "../utils/files.service";

import { FloorToPost } from "./iFloor";

@Component({
    selector: "floor-form",
    templateUrl: "./floor-form.component.html"
})

export class FloorFormComponent {

    floor: FloorToPost;
    image: File;

    constructor(
        private _floorService: FloorService,
        private _fileService: FileService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _renderer: Renderer
    ) { }

    public async ngOnInit() {
        let schoolID;
        this._route.parent.params.subscribe(params => schoolID = params['id']);
        this.floor.SchoolFK=schoolID;
    }

    public show(elementID: string) {
        document.getElementById(elementID).style.display = 'block';
    }

    public hide(elementID: string) {
        document.getElementById(elementID).style.display = 'none';
    }

    public getImage(event){
        this.image = event.target.files[0];
    }

    public async createFloor(){
        this.floor.Image = await this._fileService.imageUpload(this.image);
        await this._floorService.createFloor(this.floor);
        location.reload();
    }
}