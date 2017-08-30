// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Class } from "./iClass";
import { API } from '../../main';
import { UserProfile } from '../users/iUsers';

@Injectable()
export class ClassService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
    }

    public getClassesBySchool(schoolID: Number): Observable<Class[]> {
        return this._http
            .get(this._apiURL + `/class/school/${schoolID}`, this._options)
            .map((res: Response) => {
                if (res.json().result) return res.json().data;
                else {
                    console.log(res.json().info);
                    return null;
                }
            })
            .catch(this._handleError);
    }

    public async getStudentsByClass(classID: Number): Promise<Number[]> {
        let response = await this._http
            .get(this._apiURL + `/student/class/${classID}`, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getTeachersByClass(classID: Number): Promise<Number[]> {
        let response = await this._http
            .get(this._apiURL + `/teacher/class/${classID}`, this._options)
            .toPromise();
        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getClassProfile(classID: Number): Promise<Class> {
        let response = await this._http
            .get(this._apiURL + `/class/profile/${classID}`, this._options)
            .toPromise();

        return response.json().result ? response.json().data : 0;
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}