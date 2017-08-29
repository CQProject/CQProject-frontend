import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { FloorService } from './floor.service';
import { SchoolService } from "../schools/school.service";
import { AssistantGuard } from "../utils/auth-guard.service"
import { Floor } from "./iFloor";
import { Sensor } from "./iSensor";
import { Record, Resume } from "./iRecords";
import { School } from '../schools/iSchool';

@Component({ templateUrl: "./floor-map.component.html" })

export class FloorMapComponent {

    public floors: Floor[];
    public sensors: Sensor[][];
    public selectedSensor: Sensor;
    public school: School;
    public record: Record;
    public average: Resume;
    public historic: Record[];

    constructor(
        private _service: FloorService,
        private _schoolService: SchoolService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _assistantGuard: AssistantGuard,
        private _renderer: Renderer
    ) { this.sensors = [] }

    public async ngOnInit() {
        let schoolID;
        this._route.params.subscribe(params => schoolID = params['id']);

        this.school = await this._schoolService.getSchool(schoolID);
        this.floors = await this._service.getFloorsBySchool(schoolID);

        for (var i = 0; i < this.floors.length; i++) {
            this.sensors[i] = [];
            let sensors = await this._service.getSensorsByFloor(this.floors[i].ID)
            for (var j = 0; j < sensors.length; j++) {
                this.sensors[i][j] = sensors[j];
            }
            console.log(this.sensors);
            this.createFloor(i);
        }
    }


    public createFloor(floor: number) {
        var panel = document.getElementById('board');
        panel.innerHTML = '<canvas id="canvas' + floor + '" class="w3-card w3-white" width="900" height="500"></canvas><br/>'
        var canvas: any = document.getElementById('canvas' + floor);
        var context: CanvasRenderingContext2D = canvas.getContext("2d");
        var imageObj = new Image();
        imageObj.src = "http://housing.ucdavis.edu/_images/buildings/floorplans/Nova-3.png";
        imageObj.onload = (() => {
            // design background image
            context.drawImage(imageObj, 1, 1, 900, 500);
            // design elements
            console.log("length: " + this.sensors[floor].length)
            for (var index = 0; index < this.sensors[floor].length; index++) {
                context.beginPath();
                context.arc(this.sensors[floor][index].XCoord + 10, this.sensors[floor][index].YCoord + 10, 15, 0, 2 * Math.PI);
                context.stroke();
                context.fillRect(this.sensors[floor][index].XCoord, this.sensors[floor][index].YCoord, 20, 20);
                context.stroke();
            }
        });

        this._renderer.listenGlobal(canvas, 'click', (event) => {
            var mousePos = this.getMousePos(canvas, event);
            for (var index = 0; index < this.sensors[floor].length; index++) {
                if (this.isInside(mousePos, floor, index)) {
                    this.info(floor, index);
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
    public isInside(pos: any, floor: number, index: number) {
        if (pos.x > this.sensors[floor][index].XCoord && pos.x < this.sensors[floor][index].XCoord + 20 && pos.y > this.sensors[floor][index].YCoord && pos.y < this.sensors[floor][index].YCoord + 20) return true;
        return false;
    }

    public info(floor: number, index: number){
        this.selectedSensor=this.sensors[floor][index];
        this._service
            .getSensorsValue(this.selectedSensor.ID)
            .subscribe(data => {
                this.record = data;
                console.log(data);
            });
        this._service
            .getSensorsResume(this.selectedSensor.ID)
            .subscribe(data => {
                this.average = data;
                console.log(data);
            });
        this.show();
    }

    public history(){
        this._service
            .getSensorsHistory(this.selectedSensor.ID)
            .subscribe(data => {
                this.historic = data;
                console.log(this.historic);
            });
    }

    public show() {
        document.getElementById("info").style.display = 'block';
    }

    public hide() {
        document.getElementById("info").style.display = 'none';
    }

    public accordion(){
        var x = document.getElementById("accordion");
        if (x.className.indexOf("w3-show") == -1) {
            this.history();
            x.className += " w3-show";
        } else { 
            x.className = x.className.replace(" w3-show", "");
        }
    }
}