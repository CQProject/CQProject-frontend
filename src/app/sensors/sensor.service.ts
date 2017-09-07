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
import { Record, Resume } from './iRecords';
import { API } from '../../main';

@Injectable()
export class SensorService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
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

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}