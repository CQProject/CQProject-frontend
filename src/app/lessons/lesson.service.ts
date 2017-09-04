// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { API } from '../../main';
import { Lesson } from "./iLesson";
import { Presence } from "./iPresence";

@Injectable()
export class LessonService {

    private _headers: Headers;
    private _options: RequestOptions;
    private readonly _apiURL = API.url;

    constructor(private _http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json; charset=utf-8');
        this._headers.append('Authorization', <string>JSON.parse(localStorage.getItem('currentUser')).token);
        this._options = new RequestOptions({ headers: this._headers });
    }

    public async getLessonBySubject(subjectID: number, classID: number): Promise<Lesson[]> {
        let response = await this._http
            .get(this._apiURL + `/lesson/list/${subjectID}/${classID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public async getPresenceByTeacher(lessonID: number): Promise<Presence[]> {
        let response = await this._http
            .get(this._apiURL + `/lesson/teacher/${lessonID}`, this._options)
            .toPromise();

        if (response.json().result) return response.json().data;
        else {
            console.log(response.json().info);
            return null;
        }
    }

    public getPresenceByStudent(lessonID: number): Observable<Presence> {
        return this._http
            .get(this._apiURL + `/lesson/student/${lessonID}`, this._options)
            .map((response: Response) => {
                if (response.json().result) return response.json().data;
                else {
                    console.log(response.json().info);
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