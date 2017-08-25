// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/toPromise';

import { School } from "./iSchool";
import { API } from '../../main';

@Injectable()
export class SchoolService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._options = new RequestOptions({ headers: this._headers });
    }

    public async getSchools(): Promise<School[]> {
        let response = await this._http
            .get(this._apiURL + '/school', this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getSchool(schoolID: Number): Promise<School> {
        let response = await this._http
            .get(this._apiURL + `/school/${schoolID}`, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}