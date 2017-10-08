import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FloorService } from './floor.service';
import { RoomService } from './room.service';
import { SensorService } from './sensor.service';
import { SchoolService } from "../schools/school.service";
import { FileService } from "../utils/files.service";

import { Floor } from "./iFloor";
import { Sensor } from "./iSensor";
import { Record, Resume } from "./iRecords";
import { School } from '../schools/iSchool';

@Component({
    selector: "floor-map",
    templateUrl: "./floor-map.component.html"
})

export class FloorMapComponent {

    public floor: any;

    constructor(
        private _roomService: RoomService,
        private _floorService: FloorService,
        private _schoolService: SchoolService,
        private _fileService: FileService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _renderer: Renderer
    ) {
        _route.params.subscribe(params => {
            this.init(params['id']);
          });
     }
     
    public async init(floorID){
        let floor = await this._floorService.getFloor(floorID);
        let rooms = await this._roomService.getRoomByFloor(floor.ID);

        this.floor = {
            Name: floor.Name,
            Image: await this._fileService.imageDownloadAsync(floor.Image),
            ID: floor.ID,
            Rooms: rooms,
            SchoolFK: floor.SchoolFK
        }
        console.log(this.floor)
        this.createFloor();
    }

    public createFloor() {
        var panel = document.getElementById('board');
        panel.innerHTML = '<canvas id="canvas'+this.floor.ID+'" class="card white" width="945" height="700"></canvas><br/>'
        var canvas: any = document.getElementById('canvas'+this.floor.ID);
        var context: CanvasRenderingContext2D = canvas.getContext("2d");
        var imageObj = new Image();
        imageObj.src = this.floor.Image.changingThisBreaksApplicationSecurity;
        imageObj.onload = (() => {
            // design background image
            context.drawImage(imageObj, 1, 1, 945, 700);
            // design elements
            if (this.floor.Rooms != null) {
                for (var index = 0; index < this.floor.Rooms.length; index++) {
                    context.beginPath();
                    context.arc(this.floor.Rooms[index].XCoord + 10, this.floor.Rooms[index].YCoord + 10, 15, 0, 2 * Math.PI);
                    context.stroke();
                    if (this.floor.Rooms[index].HasSensor)
                        context.fillStyle = "#FF0000";
                    else
                        context.fillStyle = "#000000";
                    context.fillRect(this.floor.Rooms[index].XCoord, this.floor.Rooms[index].YCoord, 20, 20);
                    context.stroke();
                }
            }
        });

        this._renderer.listenGlobal(canvas, 'click', (event) => {
            var mousePos = this.getMousePos(canvas, event);
            for (var index = 0; index < this.floor.Rooms.length; index++) {
                if (this.isInside(mousePos, index)) {
                    if (this.floor.Rooms[index].HasSensor) {
                        this.navigateTo(index);
                    }
                }
            }
        });
    }

    //Function to get the mouse position
    public getMousePos(canvas: any, event: any) {
        var board = canvas.getBoundingClientRect();
        return {
            x: event.clientX - board.left,
            y: event.clientY - board.top
        };
    }
    //Function to check whether a point is inside a rectangle
    public isInside(pos: any, index: number) {
        if (pos.x > this.floor.Rooms[index].XCoord && pos.x < this.floor.Rooms[index].XCoord + 20 && pos.y > this.floor.Rooms[index].YCoord && pos.y < this.floor.Rooms[index].YCoord + 20) return true;
        return false;
    }

    public navigateTo(index:number){
        if (this.floor.Rooms[index].HasSensor) {
            let url = "/";
            for (let segment of this._route.parent.url["_value"]) url += segment.path + "/";
            this._router.navigate([url.substring(0, url.length - 1), 'room', this.floor.Rooms[index].ID]);
        }
    }
}