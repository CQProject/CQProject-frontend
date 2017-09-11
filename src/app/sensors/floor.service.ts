// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Floor, FloorToPost } from "./iFloor";
import { Sensor } from './iSensor';
import { Record, Resume } from './iRecords';
import { API } from '../../main';

@Injectable()
export class FloorService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
    }

    public async getFloorsBySchool(schoolID: number): Promise<Floor[]> {
        let response = await this._http
            .get(this._apiURL + `/floor/school/${schoolID}`, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getFloor(floorID: number): Promise<Floor> {
        let response = await this._http
            .get(this._apiURL + `/floor/single/${floorID}`, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async createFloor(floor: FloorToPost): Promise<boolean>{
        var toPost = JSON.stringify({floor});
        
        let res = await this._http
        .post(this._apiURL + '/floor', toPost, this._options).toPromise();

        return res.json().result;
    }
}