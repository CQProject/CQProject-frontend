// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { API } from '../../main';
import { Time } from "./interfaceTime";

@Injectable()
export class TimeService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
    }

    public async getTimeByPrimary(schoolID: number): Promise<Time[]> {
        let response = await this._http
            .get(this._apiURL + `/time/primary/${schoolID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getTimeByKindergarten(schoolID: number): Promise<Time[]> {
        let response = await this._http
            .get(this._apiURL + `/time/kindergarten/${schoolID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getSingleTime(timeID: number): Promise<Time> {
        let response = await this._http
            .get(this._apiURL + `/time/single/${timeID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async createTimes(time: Time) {
        console.log(time.StartTime)
        let res = await this._http
            .post(this._apiURL + '/time', time, this._options).toPromise();
        if (res.json().result) return res.json().data;
        else {
            console.log(res.json().info);
            return null;
        }
    }



    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}