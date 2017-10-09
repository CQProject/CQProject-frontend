import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, Renderer,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoomService } from '../sensors/room.service';
import { FloorService } from '../sensors/floor.service';
import { SchoolService } from '../schools/school.service';
import { FileService } from "../utils/files.service";

import { School } from "../schools/iSchool";
import { Floor } from '../sensors/iFloor';
import { Room } from '../sensors/iRoom';

@Component({
    selector: "room-form",
    templateUrl: "./room-form.component.html"
})

export class RoomFormComponent {

    room: Room;
    image: any;


    constructor(
        private _floorService: FloorService,
        private _schoolService: SchoolService,
        private _roomService: RoomService,
        private _fileService: FileService,
        private _route: ActivatedRoute,
        private _changeDetetor: ChangeDetectorRef,
        private _renderer: Renderer
    ) { this.room = new Room(); }

    public async ngOnInit() {
        this._route.params.subscribe(params => this.room.FloorFK = params['id']);
        let floor = await this._floorService.getFloor(this.room.FloorFK);
        this.image = await this._fileService.imageDownloadAsync(floor.Image);
        this.createFloor();
    }

    public createFloor() {
        var panel = document.getElementById('board');
        panel.innerHTML = '<canvas id="canvas" class="card white" width="945" height="700"></canvas><br/>'
        var canvas: any = document.getElementById('canvas');
        var context: CanvasRenderingContext2D = canvas.getContext("2d");
        var imageObj = new Image();
        imageObj.src = this.image.changingThisBreaksApplicationSecurity;
        imageObj.onload = (() => context.drawImage(imageObj, 1, 1, 945, 700));

        this._renderer.listenGlobal(canvas, 'click', (event) => {
            context.drawImage(imageObj, 1, 1, 945, 700);
            this.getMousePos(canvas, event);
            context.beginPath();
            context.arc(this.room.XCoord + 10, this.room.YCoord + 10, 15, 0, 2 * Math.PI);
            context.stroke();
            context.fillRect(this.room.XCoord, this.room.YCoord, 20, 20);
            context.stroke();
            console.log(this.room)
        });
    }

    //Function to get the mouse position
    public getMousePos(canvas: any, event: any) {
        var board = canvas.getBoundingClientRect();
        this.room.XCoord = event.clientX - board.left;
        this.room.YCoord = event.clientY - board.top;
    }

    public getImage(event) {
        this.image = event.target.files[0];
    }

    public async createRoom() {
        var result = await this._roomService.createRoom(this.room)
        this.room = new Room();
        this._changeDetetor.detectChanges();
    }

}