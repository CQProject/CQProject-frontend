import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';

import { FloorService } from './floor.service';
import { RoomService } from './room.service';
import { SensorService } from './sensor.service';
import { SchoolService } from "../schools/school.service";
import { FileService } from "../utils/files.service";
import { AssistantGuard } from "../utils/auth-guard.service"

import { Floor } from "./iFloor";
import { Room } from './iRoom';
import { Sensor } from "./iSensor";
import { Record, Resume } from "./iRecords";
import { School } from '../schools/iSchool';

@Component({ templateUrl: "./room.component.html" })

export class RoomComponent {

    public selectedSensor: any;
    public sensors: Sensor[];
    public room: Room;
    public record: Record;
    public average: Resume;
    public historic: Record[];

    constructor(
        private _roomService: RoomService,
        private _sensorService: SensorService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _assistantGuard: AssistantGuard,
        private _renderer: Renderer
    ) { }

    public async ngOnInit() {
        let roomID;
        this._route.params.subscribe(params => roomID = params['id']);
        this._sensorService
            .getSensorsByRoom(roomID)
            .subscribe(data => {
                this.sensors = data;
                console.log(data);
            });
        this.room = await this._roomService.getRoom(roomID);
    }

    public info(index: number) {
        this.hide();
        this.selectedSensor = this.sensors[index];
        this._sensorService
            .getSensorsValue(this.selectedSensor.ID)
            .subscribe(data => {
                this.record = data;
                console.log(data);
            });
        this._sensorService
            .getSensorsResume(this.selectedSensor.ID)
            .subscribe(data => {
                this.average = data;
                console.log(data);
            });
        this.show();
    }

    public history() {
        this._sensorService
            .getSensorsHistory(this.selectedSensor.ID)
            .subscribe(data => {
                this.historic = data;
            });
    }

    public show() {
        var x = document.getElementById("info");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        }
    }

    public hide() {
        var x = document.getElementsByClassName("accordion");
        for (let i = 0; i < x.length; i++)
            x[i].className.replace(" w3-show", "");
    }

    public accordion(id: string) {
        var x = document.getElementById(id);
        if (x.className.indexOf("w3-show") == -1) {
            this.history();
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

}