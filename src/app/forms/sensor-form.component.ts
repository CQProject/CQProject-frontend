import { Sensor } from '../sensors/iSensor';
import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SensorService } from '../sensors/sensor.service';
import { RoomService } from '../sensors/room.service';
import { FloorService } from '../sensors/floor.service';
import { SchoolService } from '../schools/school.service';
import { FileService } from "../utils/files.service";

import { School } from "../schools/iSchool";
import { Floor } from '../sensors/iFloor';
import { Room } from '../sensors/iRoom';

@Component({
    selector: "sensor-form",
    templateUrl: "./sensor-form.component.html"
})

export class SensorFormComponent {

    schools: School[];
    floors: Floor[];
    rooms: Room[];
    sensor: Sensor;


    constructor(
        private _floorService: FloorService,
        private _schoolService: SchoolService,
        private _roomService: RoomService,
        private _sensorService:SensorService,
        private _fileService: FileService,
        private _route: ActivatedRoute,
        private _renderer: Renderer
    ) { 
        this.sensor = new Sensor(); 
        this.schools=[];
        this.floors=[];
        this.rooms=[];
    }

    public async ngOnInit() {
        this.schools = await this._schoolService.getSchools();
    }

    public async getFloors(schoolID: number) {
        this.floors = await this._floorService.getFloorsBySchool(schoolID);
    }

    public async getRooms(floorID: number) {
        this.rooms = await this._roomService.getRoomByFloor(floorID);
    }

    public async createSensor() {
        console.log(this.sensor)
        var result = await this._sensorService.createSensor(this.sensor);
        if (result) location.reload();
    }

}