// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/toPromise';

import { ISchool } from "../interfaces/school";
import { API } from '../../main';

@Injectable()
export class HomeService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._options = new RequestOptions({ headers: this._headers });
    }

    getSchools(): Observable<ISchool[]> {
        return this._http
            .get(this._apiURL+'/school/home', this._options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}