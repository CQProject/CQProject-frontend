import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { API } from '../main';
import { ISecretarySummary } from '../interfaces';

@Injectable()
export class DashboardService {

    headers: Headers;
    options: RequestOptions;
    apiURL = API.url;

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });
    }

    getSecretaries(): Observable<ISecretarySummary[]> {
        return this._http
            .get(this.apiURL + '/secretary', this.options)
            .map((response: Response) => <ISecretarySummary[]>response.json())
            .catch(this.handleError);
    }

    getTeachers(): Observable<ISecretarySummary[]> {
        return this._http
            .get(this.apiURL + '/teacher', this.options)
            .map((response: Response) => <ISecretarySummary[]>response.json())
            .catch(this.handleError);
    }

    getAssistants(): Observable<ISecretarySummary[]> {
        return this._http
            .get(this.apiURL + '/assistant', this.options)
            .map((response: Response) => <ISecretarySummary[]>response.json())
            .catch(this.handleError);
    }

    getClasses(): Observable<ISecretarySummary[]> {
        return this._http
            .get(this.apiURL + '/class', this.options)
            .map((response: Response) => <ISecretarySummary[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}