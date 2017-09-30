// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Floor } from "./iFloor";
import { Sensor } from './iSensor';
import { Room } from "./iRoom";
import { Record, Resume } from './iRecords';
import { RoomService } from './room.service'
import { API } from '../../main';

@Injectable()
export class SensorService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;
    private room: Room;

    constructor(private _http: Http, private _roomService: RoomService) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
    }

    public getSensorsByRoom(roomID: number): Observable<Sensor[]> {
        return this._http
            .get(this._apiURL + `/sensor/room/${roomID}`, this._options)
            .map((res: Response) => {
                if (res.json().result) return res.json().data;
                else {
                    console.log(res.json().info);
                    return null;
                }
            })
            .catch(this._handleError);
    }

    public getSensorsValue(sensorID: number): Observable<Record> {
        return this._http
            .get(this._apiURL + `/sensor/last/${sensorID}`, this._options)
            .map((res: Response) => {
                if (res.json().result) return res.json().data;
                else {
                    console.log(res.json().info);
                    return null;
                }
            })
            .catch(this._handleError);
    }

    public getSensorsHistory(sensorID: number): Observable<Record[]> {
        return this._http
            .get(this._apiURL + `/sensor/history/${sensorID}`, this._options)
            .map((res: Response) => {
                if (res.json().result) return res.json().data;
                else {
                    console.log(res.json().info);
                    return null;
                }
            })
            .catch(this._handleError);
    }

    public getSensorsResume(sensorID: number): Observable<Resume> {
        return this._http
            .get(this._apiURL + `/sensor/resume/${sensorID}`, this._options)
            .map((res: Response) => {
                if (res.json().result) return res.json().data;
                else {
                    console.log(res.json().info);
                    return null;
                }
            })
            .catch(this._handleError);
    }

    public async createSensor(sensor: Sensor): Promise<boolean> {
        var toPost = JSON.stringify({
            Name: sensor.Name,
            RoomFK: sensor.RoomFK
        });
        let res = await this._http
            .post(this._apiURL + '/sensor', toPost, this._options).toPromise();
        this.room = await this._roomService.getRoom(sensor.RoomFK);
        this.room.HasSensor = true;
        this._roomService.editRoom(this.room);
        return res.json().result;
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}